# M-Pesa Daraja API Integration - SafeRide

## Overview
SafeRide now includes full M-Pesa payment integration using Kenya's Daraja API for secure mobile payments.

## Features Implemented

### Backend Integration
1. **M-Pesa Service** (`services/mpesa_service.py`)
   - OAuth token generation
   - STK Push payment initiation
   - Transaction status queries
   - Callback handling

2. **Mock Service** (`services/mock_mpesa_service.py`)
   - Development testing without real API credentials
   - Simulates successful/failed payments
   - Generates mock transaction IDs

3. **Payment Model** (`models/__init__.py`)
   - Tracks payment status (pending, completed, failed)
   - Stores M-Pesa transaction details
   - Links payments to trips and users

4. **API Routes** (`routes/mpesa.py`)
   - `POST /api/mpesa/initiate-payment` - Start payment
   - `POST /api/mpesa/callback` - Handle M-Pesa callbacks
   - `GET /api/mpesa/query-payment/<id>` - Check payment status

### Frontend Integration
1. **MpesaPayment Component** (`components/MpesaPayment.jsx`)
   - Phone number input with validation
   - Payment amount display
   - Real-time status updates
   - Payment polling mechanism

2. **API Service** (`services/api.js`)
   - M-Pesa payment functions
   - Error handling
   - Response processing

## Configuration

### Environment Variables
```bash
# M-Pesa Daraja API Configuration
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your-passkey
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
```

### Database Schema
```sql
CREATE TABLE payments (
    id INTEGER PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    checkout_request_id VARCHAR(100) UNIQUE,
    merchant_request_id VARCHAR(100),
    mpesa_receipt_number VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage Flow

1. **User initiates payment**
   - Enters M-Pesa phone number
   - Confirms payment amount
   - Clicks "Pay with M-Pesa"

2. **Backend processes request**
   - Validates trip and user
   - Formats phone number (254XXXXXXXXX)
   - Calls Daraja STK Push API
   - Creates payment record

3. **M-Pesa sends STK Push**
   - User receives payment prompt on phone
   - Enters M-Pesa PIN to confirm
   - M-Pesa processes payment

4. **Callback handling**
   - M-Pesa sends callback to `/api/mpesa/callback`
   - Payment status updated in database
   - Trip status updated if payment successful

5. **Frontend polling**
   - Polls payment status every 10 seconds
   - Shows success/failure message
   - Redirects on successful payment

## Testing

### Mock Service Testing
```bash
# Run the test script
python test_mpesa.py
```

### Manual Testing
```bash
# 1. Create a trip
curl -X POST http://localhost:5000/api/trips \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pickup_location":"CBD","dropoff_location":"Westlands","fare":500}'

# 2. Initiate payment
curl -X POST http://localhost:5000/api/mpesa/initiate-payment \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"phone_number":"254712345678","amount":500,"trip_id":1}'
```

## Production Setup

### 1. Get Daraja API Credentials
- Register at https://developer.safaricom.co.ke
- Create an app to get Consumer Key and Secret
- Get Business Short Code and Passkey

### 2. Configure Callback URL
- Set up public HTTPS endpoint for callbacks
- Use ngrok for development: `ngrok http 5000`
- Update `MPESA_CALLBACK_URL` in environment

### 3. Phone Number Validation
- Supports formats: 0712345678, 254712345678, +254712345678
- Automatically converts to 254XXXXXXXXX format
- Validates Kenyan mobile numbers

## Security Features

1. **JWT Authentication** - All payment endpoints require valid tokens
2. **User Validation** - Users can only pay for their own trips
3. **Phone Number Formatting** - Prevents injection attacks
4. **Amount Validation** - Ensures positive payment amounts
5. **Callback Verification** - Validates M-Pesa callback authenticity

## Error Handling

- Invalid phone numbers
- Insufficient funds
- Network timeouts
- User cancellation
- API rate limits
- Callback failures

## Status Codes

- `pending` - Payment initiated, waiting for user action
- `completed` - Payment successful, M-Pesa receipt received
- `failed` - Payment failed or cancelled
- `cancelled` - User cancelled payment

## Integration Complete ✅

The M-Pesa Daraja API integration is fully functional and ready for production use with proper API credentials.