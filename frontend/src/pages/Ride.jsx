import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { mpesaService } from '../services/api'
import LocationInput from '../components/LocationInput'
import LiveMap from '../components/LiveMap'
import { mapService } from '../services/mapService'
import { useGeolocation } from '../hooks/useGeolocation'

const Ride = () => {
  const { isAuthenticated: authIsAuthenticated, user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [rideStatus, setRideStatus] = useState('idle')
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [pickupLocation, setPickupLocation] = useState(null)
  const [dropoffLocation, setDropoffLocation] = useState(null)
  const [estimatedFare, setEstimatedFare] = useState(null)
  const [driver, setDriver] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [tripProgress, setTripProgress] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('mpesa')
  const [paymentPhone, setPaymentPhone] = useState('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')
  const { location: userLocation } = useGeolocation()
  const [mockDriverLocation, setMockDriverLocation] = useState(null)
  const [rating, setRating] = useState(0)
  const [showRating, setShowRating] = useState(false)
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false)
  const mockDriver = {
    name: 'David Kimani',
    rating: 4.9,
    phone: '+254 712 345 678',
    car: 'Toyota Vitz 2019',
    license: 'KCA 123A',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    eta: '3 mins',
    location: 'Westlands, Nairobi'
  }

  const sendOTP = () => {
    if (phoneNumber.match(/^\+254[0-9]{9}$/)) {
      setOtpSent(true)
      setTimeout(() => {
        alert('OTP sent to ' + phoneNumber)
      }, 500)
    } else {
      alert('Please enter a valid Kenyan phone number (+254...)')
    }
  }

  const verifyOTP = () => {
    if (otp === '1234') {
      setIsAuthenticated(true)
      setActiveTab('request')
    } else {
      alert('Invalid OTP. Use 1234 for demo')
    }
  }

  const handleRequestRide = () => {
    if (!pickup || !dropoff) {
      alert('Please enter both pickup and drop-off locations')
      return
    }
    if (!authIsAuthenticated) {
      setActiveTab('auth')
      return
    }
    setRideStatus('searching')
    setTimeout(() => {
      setRideStatus('found')
      setDriver(mockDriver)
      setActiveTab('tracking')
      startTripProgress()
    }, 3000)
  }

  const startTripProgress = () => {
    // Simulate driver movement
    if (pickupLocation?.lat && dropoffLocation?.lat) {
      const startLat = pickupLocation.lat
      const startLng = pickupLocation.lng
      const endLat = dropoffLocation.lat
      const endLng = dropoffLocation.lng
      
      setMockDriverLocation({ lat: startLat, lng: startLng })
    }
    
    const interval = setInterval(() => {
      setTripProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowRating(true)
          return 100
        }
        
        // Update mock driver location
        if (pickupLocation?.lat && dropoffLocation?.lat) {
          const progress = (prev + 10) / 100
          const lat = pickupLocation.lat + (dropoffLocation.lat - pickupLocation.lat) * progress
          const lng = pickupLocation.lng + (dropoffLocation.lng - pickupLocation.lng) * progress
          setMockDriverLocation({ lat, lng })
        }
        
        return prev + 10
      })
    }, 1000)
  }

  const submitRating = () => {
    alert(`Thank you for rating ${driver.name} with ${rating} stars!`)
    setShowRating(false)
    setRideStatus('completed')
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user', time: new Date().toLocaleTimeString() }])
      setNewMessage('')
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Thanks! I\'m on my way to you.', sender: 'driver', time: new Date().toLocaleTimeString() }])
      }, 1000)
    }
  }

  return (
    <div>
      {/* Header */}
      <header>
        <div className="fixed top-0 w-full h-[60px] z-[101] bg-white shadow-sm">
          <div className="container max-w-[1184px] h-full flex justify-between items-center px-6 py-3 mx-auto">
            <Link to="/" className="text-2xl font-bold text-gray-900">SafeRide</Link>
            <div className="flex gap-4 items-center">
              <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">About</Link>
              <Link to="/support" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">Support</Link>
              {authIsAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">Dashboard</Link>
                  <button 
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setShowRegisterDropdown(!showRegisterDropdown)}
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Register
                  </button>
                  {showRegisterDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                      <Link to="/signup?role=driver" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">Become a Driver</Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <article>
          {/* Hero Section */}
          <div className="pt-[60px]">
            <div className="flex w-full min-h-[680px] py-[120px] md:py-10 bg-white relative">
              <div className="container max-w-[1184px] px-6 flex relative grow items-center mx-auto">
                <div className="flex flex-col md:flex-row md:gap-x-28 md:items-center w-full">
                  <div className="w-full md:max-w-[560px] mb-12 md:mb-0">
                    <h1 className="font-semibold mt-0 text-5xl md:text-7xl mb-6 text-gray-900">Book Your Ride.<br/>Track Your Journey.</h1>
                    <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-8 text-gray-600">Experience seamless transportation with real-time tracking, secure payments, and professional drivers available 24/7.</p>
                    <button 
                      onClick={() => authIsAuthenticated ? setActiveTab('request') : setActiveTab('auth')} 
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
                    >
                      Order a Driver
                    </button>
                  </div>
                  <div className="relative overflow-hidden w-full h-auto md:max-w-[560px]">
                    <img src="/saferide2.jpg" alt="SafeRide Service" className="w-full h-auto rounded-lg object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Modal */}
          {activeTab === 'auth' && !authIsAuthenticated && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md mx-4 w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Login Required</h2>
                  <button 
                    onClick={() => setActiveTab('')}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">Please login or create an account to order a driver.</p>
                
                <div className="space-y-4">
                  <Link 
                    to="/login" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors block text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 rounded-lg transition-colors block text-center"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Phone Verification Modal */}
          {activeTab === 'phone' && !isAuthenticated && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md mx-4 w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Phone Verification</h2>
                  <button 
                    onClick={() => setActiveTab('')}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                {!otpSent ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+254 712 345 678" 
                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                      />
                    </div>
                    <button 
                      onClick={sendOTP} 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Send OTP
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Enter OTP</label>
                      <input 
                        type="text" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="1234" 
                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 text-center text-2xl tracking-widest focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                        maxLength="4"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">Use 1234 for demo</p>
                    </div>
                    <button 
                      onClick={verifyOTP} 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'request' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md mx-4 w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Request Your Ride</h2>
                  <button 
                    onClick={() => setActiveTab('')}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Pickup Location</label>
                    <LocationInput
                      placeholder="Enter pickup location in Nairobi"
                      value={pickup}
                      onChange={setPickup}
                      onLocationSelect={(location) => {
                        setPickupLocation(location)
                        if (dropoffLocation && location.lat) {
                          const distance = mapService.calculateDistance(location, dropoffLocation)
                          setEstimatedFare(mapService.calculateFare(distance))
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Drop-off Location</label>
                    <LocationInput
                      placeholder="Enter destination in Nairobi"
                      value={dropoff}
                      onChange={setDropoff}
                      onLocationSelect={(location) => {
                        setDropoffLocation(location)
                        if (pickupLocation && location.lat) {
                          const distance = mapService.calculateDistance(pickupLocation, location)
                          setEstimatedFare(mapService.calculateFare(distance))
                        }
                      }}
                    />
                  </div>
                  
                  {estimatedFare && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-green-800 font-medium">Estimated Fare:</span>
                        <span className="text-green-600 font-bold text-lg">KSh {estimatedFare}</span>
                      </div>
                    </div>
                  )}
                </div>

                {rideStatus === 'idle' && (
                  <button 
                    onClick={handleRequestRide} 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-colors text-lg"
                  >
                    Request SafeRide Driver
                  </button>
                )}

                {rideStatus === 'searching' && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-900">Finding your driver...</p>
                  </div>
                )}

                {rideStatus === 'found' && (
                  <div className="text-center bg-green-100 p-4 rounded-lg">
                    <p className="text-lg font-bold text-green-800">Driver Found!</p>
                    <p className="text-green-700">Your driver is on the way. ETA: {driver?.eta}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tracking' && driver && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-4xl mx-4 w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Trip in Progress</h2>
                  <button 
                    onClick={() => setActiveTab('')}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                {/* Live Map */}
                <div className="mb-6">
                  <LiveMap
                    pickupLocation={pickupLocation}
                    dropoffLocation={dropoffLocation}
                    driverLocation={mockDriverLocation}
                    tripStatus={rideStatus}
                    className="w-full h-80"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Driver Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <img src={driver.photo} alt={driver.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{driver.name}</h3>
                        <p className="text-yellow-500">★ {driver.rating} Rating</p>
                        <p className="text-gray-600 text-sm">{driver.car}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <a 
                        href={`tel:${driver.phone}`} 
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-center font-medium transition-colors text-sm"
                      >
                        Call
                      </a>
                      <button 
                        onClick={() => setActiveTab('chat')} 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                  
                  {/* Trip Progress */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-gray-900">Trip Progress</h4>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900 font-medium">{tripProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${tripProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ETA:</span>
                        <span className="text-gray-900 font-medium">{driver.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance:</span>
                        <span className="text-gray-900 font-medium">5.2 km</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && driver && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Chat with {driver.name}</h2>
                
                <div className="bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                  {messages.length === 0 ? (
                    <p className="text-gray-400 text-center">Start a conversation with your driver</p>
                  ) : (
                    messages.map((msg, index) => (
                      <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                          <p>{msg.text}</p>
                          <p className="text-xs text-gray-300 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 bg-gray-700 rounded-lg text-white"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button onClick={sendMessage} className="btn-primary px-6">Send</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Payment Method</h2>
                
                <div className="space-y-4 mb-8">
                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-white bg-gray-700' : 'border-gray-600 bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 text-2xl">💳</div>
                      <div>
                        <h3 className="font-semibold">Credit/Debit Card</h3>
                        <p className="text-sm text-gray-400">Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      paymentMethod === 'mpesa' ? 'border-white bg-gray-700' : 'border-gray-600 bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 text-2xl">📱</div>
                      <div>
                        <h3 className="font-semibold">M-Pesa</h3>
                        <p className="text-sm text-gray-400">Pay with your mobile wallet</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Fare</span>
                      <span>KSh 200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distance (5.2 km)</span>
                      <span>KSh 150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>KSh 50</span>
                    </div>
                    <hr className="border-gray-600" />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>KSh 400</span>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'mpesa' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-white">M-Pesa Phone Number</label>
                    <input 
                      type="tel" 
                      value={paymentPhone}
                      onChange={(e) => setPaymentPhone(e.target.value)}
                      placeholder="254712345678" 
                      className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    />
                  </div>
                )}
                
                {paymentStatus && (
                  <div className={`mb-4 p-3 rounded-lg text-center ${
                    paymentStatus.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {paymentStatus}
                  </div>
                )}
                
                <button 
                  onClick={async () => {
                    if (paymentMethod === 'mpesa') {
                      if (!paymentPhone) {
                        setPaymentStatus('Please enter your M-Pesa phone number')
                        return
                      }
                      setPaymentLoading(true)
                      setPaymentStatus('Initiating payment...')
                      try {
                        const result = await mpesaService.initiatePayment(paymentPhone, 400, 'TRIP_001')
                        if (result.success) {
                          setPaymentStatus('Payment request sent to your phone. Please complete the payment.')
                        } else {
                          setPaymentStatus('Payment failed: ' + result.message)
                        }
                      } catch (error) {
                        setPaymentStatus('Payment failed. Please try again.')
                      } finally {
                        setPaymentLoading(false)
                      }
                    }
                  }}
                  disabled={paymentLoading}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50"
                >
                  {paymentLoading ? 'Processing...' : 'Pay KSh 400'}
                </button>
              </div>
            </div>
          )}

          {showRating && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Rate Your Driver</h2>
                
                <div className="text-center mb-6">
                  <img src={driver.photo} alt={driver.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
                  <h3 className="text-xl font-bold">{driver.name}</h3>
                </div>

                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl mx-1 transition-colors ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowRating(false)}
                    className="flex-1 btn-secondary"
                  >
                    Skip
                  </button>
                  <button 
                    onClick={submitRating}
                    className="flex-1 btn-primary"
                    disabled={rating === 0}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </article>

          {/* Features Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-semibold mt-0 text-3xl md:text-5xl mb-6 text-gray-900">Order a Driver with SafeRide Kenya</h2>
              <button 
                onClick={() => authIsAuthenticated ? setActiveTab('request') : setActiveTab('auth')} 
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-xl mb-16"
              >
                Get Driver
              </button>
              
              <h3 className="font-semibold mt-0 text-2xl md:text-4xl mb-12 text-gray-900">Why Order a Driver with Us?</h3>
              <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-20 text-gray-600 max-w-5xl mx-auto">
                SafeRide Kenya offers the most reliable and professional designated driver service in the country. 
                Our vetted drivers ensure you and your vehicle reach your destination safely, while you relax and enjoy the journey. 
                Available 24/7 across major cities in Kenya with transparent pricing and real-time tracking.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              <div className="text-center">
                <img src="/assets/drivewithsaferide.jpg" alt="Professional Service" className="w-full h-96 rounded-lg object-cover mb-6" />
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900">Professional Service</h4>
              </div>
              <div className="text-center">
                <img src="/saferide2.jpg" alt="24/7 Availability" className="w-full h-96 rounded-lg object-cover mb-6" />
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900">24/7 Availability</h4>
              </div>
              <div className="text-center">
                <img src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=400&fit=crop&crop=center" alt="Safe & Secure" className="w-full h-96 rounded-lg object-cover mb-6" />
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900">Safe & Secure</h4>
              </div>
              <div className="text-center">
                <img src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center" alt="Real-time Tracking" className="w-full h-96 rounded-lg object-cover mb-6" />
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900">Real-time Tracking</h4>
              </div>
            </div>
          </section>
        </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col items-start">
              <div className="text-2xl font-bold mb-4 text-white">SafeRide</div>
              <p className="text-gray-400 mb-6">Your trusted designated driver service. Safe, reliable, and professional drivers available 24/7.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => setActiveTab('request')} className="hover:text-white transition-colors">Request Driver</button></li>
                <li><Link to="/signup?role=driver" className="hover:text-white transition-colors">Become a Driver</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Event Services</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/support#safety" className="hover:text-white transition-colors">Safety</Link></li>
                <li><Link to="/support#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/support#emergency" className="hover:text-white transition-colors">Report Issue</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +254 712 345 678
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@saferide.com
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Nairobi, Kenya
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Available 24/7
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 SafeRide. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Ride