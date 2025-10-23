import uuid
import time
from datetime import datetime

class MockMpesaService:
    """Mock M-Pesa service for testing without real API credentials"""
    
    def __init__(self):
        self.mock_mode = True
    
    def get_access_token(self):
        """Mock access token"""
        return "mock_access_token_" + str(int(time.time()))
    
    def stk_push(self, phone_number, amount, account_reference, transaction_desc):
        """Mock STK Push - simulates successful payment initiation"""
        
        # Simulate API validation
        if not phone_number or not phone_number.startswith('254'):
            return {
                'ResponseCode': '400',
                'errorMessage': 'Invalid phone number format'
            }
        
        if amount < 1:
            return {
                'ResponseCode': '400', 
                'errorMessage': 'Invalid amount'
            }
        
        # Simulate successful response
        checkout_request_id = f"ws_CO_{uuid.uuid4().hex[:20]}"
        merchant_request_id = f"mr_{uuid.uuid4().hex[:15]}"
        
        return {
            'ResponseCode': '0',
            'ResponseDescription': 'Success. Request accepted for processing',
            'CheckoutRequestID': checkout_request_id,
            'MerchantRequestID': merchant_request_id,
            'CustomerMessage': 'Success. Request accepted for processing'
        }
    
    def query_transaction(self, checkout_request_id):
        """Mock transaction query - simulates payment completion"""
        
        # Simulate different payment states based on checkout_request_id
        if 'fail' in checkout_request_id.lower():
            return {
                'ResponseCode': '1',
                'ResponseDescription': 'The transaction was cancelled by user',
                'ResultCode': '1032',
                'ResultDesc': 'Request cancelled by user'
            }
        
        # Simulate successful payment
        return {
            'ResponseCode': '0',
            'ResponseDescription': 'The service request has been accepted successfully',
            'ResultCode': '0',
            'ResultDesc': 'The service request is processed successfully.',
            'CallbackMetadata': {
                'Item': [
                    {'Name': 'Amount', 'Value': 500},
                    {'Name': 'MpesaReceiptNumber', 'Value': f'QHX{uuid.uuid4().hex[:7].upper()}'},
                    {'Name': 'PhoneNumber', 'Value': '254712345678'}
                ]
            }
        }