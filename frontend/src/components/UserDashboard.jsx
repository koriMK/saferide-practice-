import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LiveMap from '../components/LiveMap'
import { useGeolocation } from '../hooks/useGeolocation'

const UserDashboard = () => {
  const { user, logout } = useAuth()
  const { location: userLocation } = useGeolocation()
  
  // Mock active trip data
  const activeTrip = null // Set to trip data when user has active trip

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header>
        <div className="fixed top-0 w-full h-[60px] z-[101] bg-white shadow-sm">
          <div className="container max-w-[1184px] h-full flex justify-between items-center px-6 py-3 mx-auto">
            <Link to="/" className="text-2xl font-bold text-green-600">SafeRide</Link>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-[60px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
          
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Need a ride?</h2>
            <p className="text-green-100 mb-6">Get a designated driver in minutes</p>
            <Link
              to="/ride"
              className="bg-white text-green-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Request Driver
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Total Trips</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">$0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-white">5.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Trip Map */}
        {activeTrip && (
          <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Current Trip</h3>
            <LiveMap
              pickupLocation={activeTrip.pickup}
              dropoffLocation={activeTrip.dropoff}
              driverLocation={activeTrip.driverLocation}
              tripStatus={activeTrip.status}
              className="w-full h-80"
            />
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Trips</h3>
            <Link to="/trips" className="text-green-400 hover:text-green-300 text-sm font-medium">
              View all
            </Link>
          </div>
          
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white mb-2">No trips yet</h4>
            <p className="text-gray-400 mb-6">Your trip history will appear here once you start using SafeRide</p>
            <Link
              to="/ride"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-full transition-colors"
            >
              Book your first ride
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserDashboard