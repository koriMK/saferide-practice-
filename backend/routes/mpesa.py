from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
from services.mock_mpesa_service import MockMpesaService
from models import db, Payment, Trip, PaymentStatus, TripStatus
import re

mpesa_bp = Blueprint('mpesa', __name__)
mpesa_service = MockMpesaService()
print(f"Using MockMpesaService for development")

@mpesa_bp.route('/initiate-payment', methods=['POST'])
@jwt_required()
def initiate_payment():
    """Initiate M-Pesa STK Push payment"""
    data = request.get_json()
    
    phone_number = data.get('phone_number')
    amount = data.get('amount')
    trip_id = data.get('trip_id')
    
    if not all([phone_number, amount, trip_id]):
        return jsonify({'error': 'Phone number, amount, and trip ID are required'}), 400
    
    # Format phone number (remove + and ensure it starts with 254)
    phone_number = re.sub(r'[^\d]', '', phone_number)
    if phone_number.startswith('0'):
        phone_number = '254' + phone_number[1:]
    elif not phone_number.startswith('254'):
        phone_number = '254' + phone_number
    
    # Verify trip exists and user owns it
    user_id = int(get_jwt_identity())
    trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first()
    if not trip:
        return jsonify({'error': 'Trip not found'}), 404
    
    try:
        print(f"Initiating payment: phone={phone_number}, amount={amount}, trip_id={trip_id}")
        result = mpesa_service.stk_push(
            phone_number=phone_number,
            amount=int(amount),
            account_reference=f"TRIP_{trip_id}",
            transaction_desc=f"SafeRide Trip Payment - {trip_id}"
        )
        print(f"M-Pesa result: {result}")
        
        if result.get('ResponseCode') == '0':
            # Create payment record
            payment = Payment(
                trip_id=trip_id,
                user_id=user_id,
                amount=float(amount),
                phone_number=phone_number,
                checkout_request_id=result.get('CheckoutRequestID'),
                merchant_request_id=result.get('MerchantRequestID'),
                status=PaymentStatus.PENDING
            )
            db.session.add(payment)
            db.session.commit()
            
            return jsonify({
                'success': True,
                'message': 'Payment initiated successfully',
                'checkout_request_id': result.get('CheckoutRequestID'),
                'merchant_request_id': result.get('MerchantRequestID'),
                'payment_id': payment.id
            })
        else:
            return jsonify({
                'success': False,
                'message': result.get('errorMessage', 'Payment initiation failed')
            }), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mpesa_bp.route('/callback', methods=['POST'])
def mpesa_callback():
    """Handle M-Pesa payment callback"""
    data = request.get_json()
    
    # Log the callback data
    print(f"M-Pesa Callback: {data}")
    
    # Process the callback data
    stk_callback = data.get('Body', {}).get('stkCallback', {})
    result_code = stk_callback.get('ResultCode')
    checkout_request_id = stk_callback.get('CheckoutRequestID')
    
    if result_code == 0:
        # Payment successful
        callback_metadata = stk_callback.get('CallbackMetadata', {}).get('Item', [])
        
        # Extract payment details
        payment_details = {}
        for item in callback_metadata:
            name = item.get('Name')
            value = item.get('Value')
            if name == 'Amount':
                payment_details['amount'] = value
            elif name == 'MpesaReceiptNumber':
                payment_details['receipt_number'] = value
            elif name == 'PhoneNumber':
                payment_details['phone_number'] = value
        
        # Update payment status in database
        payment = Payment.query.filter_by(checkout_request_id=checkout_request_id).first()
        if payment:
            payment.status = PaymentStatus.COMPLETED
            payment.mpesa_receipt_number = payment_details.get('receipt_number')
            db.session.commit()
            
            # Update trip status to accepted if payment is successful
            trip = Trip.query.get(payment.trip_id)
            if trip and trip.status.value == 'pending':
                trip.status = TripStatus.ACCEPTED
                db.session.commit()
        
        print(f"Payment successful: {payment_details}")
    else:
        # Payment failed
        payment = Payment.query.filter_by(checkout_request_id=checkout_request_id).first()
        if payment:
            payment.status = PaymentStatus.FAILED
            db.session.commit()
        
        print(f"Payment failed for CheckoutRequestID: {checkout_request_id}")
    
    return jsonify({'ResultCode': 0, 'ResultDesc': 'Success'})

@mpesa_bp.route('/query-payment/<checkout_request_id>', methods=['GET'])
@jwt_required()
def query_payment(checkout_request_id):
    """Query M-Pesa payment status"""
    try:
        result = mpesa_service.query_transaction(checkout_request_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500