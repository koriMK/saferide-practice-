import { useState } from 'react'
import { mpesaService } from '../services/api'

const MpesaPayment = ({ tripId, amount, onPaymentSuccess, onPaymentError }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  const formatPhoneNumber = (phone) => {
    // Remove any non-digit characters
    let cleaned = phone.replace(/\D/g, '')
    
    // Handle different formats
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.slice(1)
    } else if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned
    }
    
    return cleaned
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    
    if (!phoneNumber || !tripId || !amount) {
      onPaymentError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setPaymentStatus('Initiating payment...')

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)
      
      const response = await mpesaService.initiatePayment(formattedPhone, amount, tripId)
      
      if (response.success) {
        setPaymentStatus('Payment request sent to your phone. Please check your M-Pesa menu.')
        
        // Poll for payment status
        const checkoutRequestId = response.checkout_request_id
        pollPaymentStatus(checkoutRequestId)
      } else {
        onPaymentError(response.message || 'Payment initiation failed')
        setPaymentStatus('')
      }
    } catch (error) {
      onPaymentError(error.message || 'Payment failed')
      setPaymentStatus('')
    } finally {
      setLoading(false)
    }
  }

  const pollPaymentStatus = async (checkoutRequestId) => {
    let attempts = 0
    const maxAttempts = 30 // Poll for 5 minutes (30 * 10 seconds)
    
    const poll = async () => {
      try {
        const response = await mpesaService.queryPayment(checkoutRequestId)
        
        if (response.ResultCode === '0') {
          // Payment successful
          setPaymentStatus('Payment successful!')
          onPaymentSuccess(response)
          return
        } else if (response.ResultCode && response.ResultCode !== '1032') {
          // Payment failed (1032 means still pending)
          onPaymentError('Payment failed or was cancelled')
          setPaymentStatus('')
          return
        }
        
        attempts++
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000) // Poll every 10 seconds
        } else {
          setPaymentStatus('Payment status check timed out. Please contact support if payment was deducted.')
        }
      } catch (error) {
        console.error('Error polling payment status:', error)
        attempts++
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000)
        }
      }
    }
    
    setTimeout(poll, 5000) // Start polling after 5 seconds
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">M-Pesa Payment</h3>
          <p className="text-sm text-gray-600">Pay securely with M-Pesa</p>
        </div>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            M-Pesa Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="0712345678 or 254712345678"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter your M-Pesa registered phone number
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount to pay:</span>
            <span className="text-lg font-semibold text-gray-900">KSh {amount}</span>
          </div>
        </div>

        {paymentStatus && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">{paymentStatus}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay KSh ${amount} with M-Pesa`}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500">
        <p>• You will receive an M-Pesa prompt on your phone</p>
        <p>• Enter your M-Pesa PIN to complete the payment</p>
        <p>• Payment confirmation will be sent via SMS</p>
      </div>
    </div>
  )
}

export default MpesaPayment