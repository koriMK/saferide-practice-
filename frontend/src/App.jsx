import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import About from './pages/About'
import Support from './pages/Support'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TripView from './pages/TripView'

import Dashboard from './pages/Dashboard'
import Ride from './pages/Ride'
import RequestTrip from './pages/RequestTrip'
import TripTracking from './pages/TripTracking'
import DriverOnboarding from './pages/DriverOnboarding'
import DriverLanding from './pages/DriverLanding'
import ProtectedRoute from './components/ProtectedRoute'
import CookieConsent from './components/CookieConsent'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/ride" element={<Ride />} />
            <Route path="/request-trip" element={
              <ProtectedRoute roles={['user']}>
                <RequestTrip />
              </ProtectedRoute>
            } />
            <Route path="/trip/:id" element={
              <ProtectedRoute>
                <TripTracking />
              </ProtectedRoute>
            } />
            <Route path="/driver" element={<DriverLanding />} />
            <Route path="/driver/onboarding" element={
              <ProtectedRoute roles={['driver']}>
                <DriverOnboarding />
              </ProtectedRoute>
            } />
            <Route path="/trip-view" element={<TripView />} />
          </Routes>
        </div>
        <CookieConsent />
      </Router>
    </AuthProvider>
  )
}

export default App