import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const Signup = () => {
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role') || 'user'
  const [activeTab, setActiveTab] = useState('signup')
  const [isOnline, setIsOnline] = useState(false)
  const [documents, setDocuments] = useState({ license: null, id: null, insurance: null })
  const [tripRequests, setTripRequests] = useState([
    { id: 1, pickup: 'Westlands', dropoff: 'JKIA', distance: '15km', fare: 'KSh 800' },
    { id: 2, pickup: 'Karen', dropoff: 'CBD', distance: '12km', fare: 'KSh 600' }
  ])
  const [currentTrip, setCurrentTrip] = useState(null)
  const [tripStatus, setTripStatus] = useState('idle')


  const handleFileUpload = (docType, file) => {
    setDocuments(prev => ({ ...prev, [docType]: file }))
  }

  const acceptTrip = (trip) => {
    setCurrentTrip(trip)
    setTripStatus('accepted')
    setTripRequests(prev => prev.filter(t => t.id !== trip.id))
  }

  const updateTripStatus = (status) => {
    setTripStatus(status)
    if (status === 'ended') {
      setCurrentTrip(null)
      setTripStatus('idle')
    }
  }

  if (role !== 'driver') {
    return (
      <div>
        {/* Header */}
        <header>
          <div className="fixed top-0 w-full h-[60px] z-[101] bg-white shadow-sm">
            <div className="container max-w-[1184px] h-full flex justify-between items-center px-6 py-3 mx-auto">
              <Link to="/" className="text-2xl font-bold text-green-600">SafeRide</Link>
              <div className="flex gap-4 items-center">
                <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">Home</Link>
                <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors">About</Link>
                <Link to="/support" className="text-gray-700 hover:text-gray-900 transition-colors">Support</Link>
              </div>
            </div>
          </div>
        </header>
        
        <div className="pt-[60px] min-h-screen bg-white flex items-center justify-center px-6">
          <div className="max-w-md w-full bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Account</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">First Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your first name"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Surname</label>
                <input 
                  type="text" 
                  placeholder="Enter your surname"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+254 712 345 678"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
                <input 
                  type="password" 
                  placeholder="Create a password"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Create Account
              </button>
            </form>
            
            <p className="text-center text-gray-600 mt-4">
              Already have an account? <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">Login</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <header>
        <div className="fixed top-0 w-full h-[60px] z-[101] bg-white shadow-sm">
          <div className="container max-w-[1184px] h-full flex justify-between items-center px-6 py-3 mx-auto">
            <Link to="/" className="text-2xl font-bold text-green-600">SafeRide Driver</Link>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button 
                onClick={() => setIsOnline(!isOnline)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  isOnline ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Go {isOnline ? 'Offline' : 'Online'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-[60px] min-h-screen bg-white">
        <div className="container max-w-[1184px] px-6 py-8 mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('signup')}
                className={`px-6 py-2 rounded-md transition-colors font-medium ${activeTab === 'signup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Sign Up & KYC
              </button>
              <button
                onClick={() => setActiveTab('trips')}
                className={`px-6 py-2 rounded-md transition-colors font-medium ${activeTab === 'trips' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Trip Requests
              </button>
              <button
                onClick={() => setActiveTab('current')}
                className={`px-6 py-2 rounded-md transition-colors font-medium ${activeTab === 'current' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Current Trip
              </button>
              <button
                onClick={() => setActiveTab('payouts')}
                className={`px-6 py-2 rounded-md transition-colors font-medium ${activeTab === 'payouts' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Payouts
              </button>
            </div>
          </div>

          {activeTab === 'signup' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Driver Registration & KYC</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Driving License</label>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileUpload('license', e.target.files[0])}
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      accept="image/*,application/pdf"
                    />
                    {documents.license && <p className="text-green-600 text-sm mt-1">✓ License uploaded</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">National ID</label>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileUpload('id', e.target.files[0])}
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      accept="image/*,application/pdf"
                    />
                    {documents.id && <p className="text-green-600 text-sm mt-1">✓ ID uploaded</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Insurance Certificate</label>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileUpload('insurance', e.target.files[0])}
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      accept="image/*,application/pdf"
                    />
                    {documents.insurance && <p className="text-green-600 text-sm mt-1">✓ Insurance uploaded</p>}
                  </div>
                </div>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors mt-6">
                  Submit Documents for Verification
                </button>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Nearby Trip Requests</h2>
                
                {!isOnline ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Go online to receive trip requests</p>
                  </div>
                ) : tripRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No trip requests available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tripRequests.map(trip => (
                      <div key={trip.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-900">{trip.pickup} → {trip.dropoff}</p>
                            <p className="text-gray-600">{trip.distance} • {trip.fare}</p>
                          </div>
                          <button 
                            onClick={() => acceptTrip(trip)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'current' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Current Trip</h2>
                
                {!currentTrip ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No active trip</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-gray-900">{currentTrip.pickup} → {currentTrip.dropoff}</h3>
                      <p className="text-gray-600">{currentTrip.distance} • {currentTrip.fare}</p>
                      <p className="text-sm text-gray-500 mt-2">Status: {tripStatus}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {tripStatus === 'accepted' && (
                        <button 
                          onClick={() => updateTripStatus('arrived')}
                          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold"
                        >
                          Mark as Arrived
                        </button>
                      )}
                      {tripStatus === 'arrived' && (
                        <button 
                          onClick={() => updateTripStatus('started')}
                          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold"
                        >
                          Start Trip
                        </button>
                      )}
                      {tripStatus === 'started' && (
                        <button 
                          onClick={() => updateTripStatus('ended')}
                          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold"
                        >
                          End Trip
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payouts' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Payout Summary</h2>
                
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Today's Earnings</span>
                      <span className="font-bold text-green-600">KSh 2,400</span>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-700">This Week</span>
                      <span className="font-bold text-green-600">KSh 15,600</span>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-700">This Month</span>
                      <span className="font-bold text-green-600">KSh 48,200</span>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total Trips Completed</span>
                      <span className="font-bold text-gray-900">127</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors mt-6">
                  Request Payout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-600 px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl text-white font-bold text-lg flex-shrink-0">
                S
              </div>
              <div>
                <div className="text-gray-900 font-bold">SafeRide</div>
                <div className="text-sm text-gray-600">Designated driver services</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
              Your trusted designated driver service. Safe, reliable, and professional drivers available 24/7.
            </p>

          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-gray-900 text-sm font-semibold mb-2">Services</h4>
              <ul className="space-y-2">
                <li><Link to="/ride" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Request Driver</Link></li>
                <li><span className="text-gray-900 font-medium text-sm">Become a Driver</span></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Corporate Services</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Event Services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 text-sm font-semibold mb-2">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/support" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Help Center</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Safety</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Report Issue</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 text-sm font-semibold mb-2">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>+254 712 345 678</li>
                <li>support@saferide.com</li>
                <li>Nairobi, Kenya</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-7 flex justify-between items-center gap-4 flex-wrap border-t border-gray-200 pt-5">
          <div className="flex gap-4 items-center">
            <small className="text-gray-500">© 2024 SafeRide. All rights reserved.</small>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="flex gap-3">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 7.6c-.6.3-1.2.6-1.9.7.7-.4 1.2-1.1 1.4-1.9-.7.4-1.6.7-2.5.9C16.1 6.2 15 5.8 13.8 5.8 11.5 5.8 9.7 7.6 9.7 9.9c0 .3 0 .6.1.9C6.8 10.6 4.2 9 2.5 6.8c-.3.5-.4 1.1-.4 1.6 0 1.2.6 2.3 1.6 3-.5 0-1-.1-1.4-.4 0 1.8 1.3 3.3 3 3.7-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.6 2 2.8 3.8 2.9-1.4 1.1-3.1 1.8-5 1.8-.3 0-.6 0-.9-.1 1.8 1.2 3.8 1.9 6 1.9 7.2 0 11.1-6 11.1-11.1v-.5c.8-.6 1.4-1.3 1.9-2.1-.8.3-1.6.6-2.5.7z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.1C22 6.6 17.5 2.1 12 2.1S2 6.6 2 12.1c0 4.9 3.6 8.9 8.2 9.8v-6.9H7.8v-2.9h2.4V9.3c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4v1.7h2.5l-.4 2.9h-2v6.9c4.6-.9 8.2-5 8.2-9.8z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm4.8-2.6a1.12 1.12 0 1 0 0 2.24 1.12 1.12 0 0 0 0-2.24z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Signup