import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-white">
              SafeRide
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Driver: {user?.name || 'Driver'}</span>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Toggle */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">Driver Dashboard</h1>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                isOnline
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
          
          <div className={`rounded-2xl p-8 text-white ${
            isOnline ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-gray-700 to-gray-800'
          }`}>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-3 ${
                isOnline ? 'bg-green-300 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <h2 className="text-2xl font-bold">
                You are {isOnline ? 'ONLINE' : 'OFFLINE'}
              </h2>
            </div>
            <p className={isOnline ? 'text-green-100 mt-2' : 'text-gray-300 mt-2'}>
              {isOnline ? 'Ready to accept ride requests' : 'Go online to start earning'}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Today's Earnings</p>
                <p className="text-2xl font-bold text-white">$0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Trips Today</p>
                <p className="text-2xl font-bold text-white">0</p>
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
                <p className="text-gray-400 text-sm">Rating</p>
                <p className="text-2xl font-bold text-white">5.0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Hours Online</p>
                <p className="text-2xl font-bold text-white">0h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Complete Profile</h3>
            </div>
            <p className="text-gray-400 mb-4">Upload your documents to start accepting rides</p>
            <Link
              to="/driver/onboarding"
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-full transition-colors inline-block"
            >
              Upload Documents
            </Link>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Weekly Earnings</h3>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">$0.00</div>
            <p className="text-gray-400">Total earnings this week</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Trips</h3>
            <Link to="/driver/trips" className="text-green-400 hover:text-green-300 text-sm font-medium">
              View all
            </Link>
          </div>
          
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white mb-2">No trips yet</h4>
            <p className="text-gray-400 mb-6">Go online to start receiving trip requests</p>
            <button
              onClick={() => setIsOnline(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-full transition-colors"
            >
              Go Online Now
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DriverDashboard