from flask import Blueprint, request, jsonify
from services.mpesa_service import MpesaService
from utils.decorators import jwt_required
import re

mpesa_bp = Blueprint('mpesa', __name__)
mpesa_service = MpesaService()

@mpesa_bp.route('/initiate-payment', methods=['POST'])
@jwt_required
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
    
    try:
        result = mpesa_service.stk_push(
            phone_number=phone_number,
            amount=int(amount),
            account_reference=f"TRIP_{trip_id}",
            transaction_desc=f"SafeRide Trip Payment - {trip_id}"
        )
        
        if result.get('ResponseCode') == '0':
            return jsonify({
                'success': True,
                'message': 'Payment initiated successfully',
                'checkout_request_id': result.get('CheckoutRequestID'),
                'merchant_request_id': result.get('MerchantRequestID')
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
        
        # Update trip payment status in database
        # TODO: Implement database update logic
        
        print(f"Payment successful: {payment_details}")
    else:
        # Payment failed
        print(f"Payment failed for CheckoutRequestID: {checkout_request_id}")
    
    return jsonify({'ResultCode': 0, 'ResultDesc': 'Success'})

@mpesa_bp.route('/query-payment/<checkout_request_id>', methods=['GET'])
@jwt_required
def query_payment(checkout_request_id):
    """Query M-Pesa payment status"""
    try:
        result = mpesa_service.query_transaction(checkout_request_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500