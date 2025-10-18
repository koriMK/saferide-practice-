import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    pendingDrivers: 3,
    totalTrips: 0,
    activeTrips: 0,
    revenue: 0
  })
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header>
        <div className="fixed top-0 w-full h-[60px] z-[101] bg-white shadow-sm">
          <div className="container max-w-[1184px] h-full flex justify-between items-center px-6 py-3 mx-auto">
            <Link to="/" className="text-2xl font-bold text-green-600">SafeRide</Link>
            <div className="flex gap-4 items-center">
              <span className="text-gray-700">Admin: {user?.name || 'Administrator'}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-[60px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users, drivers, and monitor platform activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Active Drivers</p>
                <p className="text-2xl font-bold text-white">{stats.totalDrivers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Pending Approvals</p>
                <p className="text-2xl font-bold text-white">{stats.pendingDrivers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Total Trips</p>
                <p className="text-2xl font-bold text-white">{stats.totalTrips}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Driver Verification</h3>
            </div>
            <p className="text-gray-400 mb-4">Review and approve driver applications</p>
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-semibold">{stats.pendingDrivers} pending</span>
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                Review Now
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Trip Management</h3>
            </div>
            <p className="text-gray-400 mb-4">Monitor active and completed trips</p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-semibold">{stats.activeTrips} active</span>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                View Trips
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white ml-4">Revenue</h3>
            </div>
            <p className="text-gray-400 mb-4">Platform earnings and analytics</p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-semibold text-xl">${stats.revenue}</span>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <button className="text-green-400 hover:text-green-300 text-sm font-medium">
              View all activity
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-white font-medium">New driver application received</p>
                <p className="text-gray-400 text-sm">John Doe submitted documents for review</p>
              </div>
              <span className="text-gray-400 text-sm">2 min ago</span>
            </div>
            
            <div className="flex items-center p-4 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Trip completed successfully</p>
                <p className="text-gray-400 text-sm">Trip #1234 from Downtown to Airport</p>
              </div>
              <span className="text-gray-400 text-sm">5 min ago</span>
            </div>
            
            <div className="flex items-center p-4 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-white font-medium">New user registered</p>
                <p className="text-gray-400 text-sm">Sarah Johnson joined the platform</p>
              </div>
              <span className="text-gray-400 text-sm">10 min ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard