import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-2xl font-bold">SafeRide</div>
          <div className="space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
                <button 
                  onClick={() => { logout(); window.location.href = '/'; }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Car. Our Driver.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            When you can't drive, we'll drive your car home safely. 
            Professional designated drivers at your service.
          </p>
          
          <Link to="/request-trip" className="btn-primary text-lg px-8 py-4">
            Request a Driver
          </Link>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-8">
          <div className="card bg-gray-800 border-gray-700">
            <div className="text-accent text-3xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-2">Your Vehicle</h3>
            <p className="text-gray-300">We drive your car, so you wake up with it at home.</p>
          </div>
          
          <div className="card bg-gray-800 border-gray-700">
            <div className="text-accent text-3xl mb-4">👨‍✈️</div>
            <h3 className="text-xl font-semibold mb-2">Verified Drivers</h3>
            <p className="text-gray-300">Background-checked, licensed professionals.</p>
          </div>
          
          <div className="card bg-gray-800 border-gray-700">
            <div className="text-accent text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-gray-300">Track your driver and trip progress live.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home