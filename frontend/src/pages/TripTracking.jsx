import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const TripTracking = () => {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        // In a real app, you'd fetch trip details
        // For now, simulate trip data
        setTrip({
          id: id,
          pickup_location: '123 Main St, Downtown',
          dropoff_location: '456 Oak Ave, Suburbs',
          status: 'accepted',
          fare: 25.00,
          driver: {
            name: 'John Smith',
            rating: 4.9,
            car_model: 'Toyota Camry',
            license_plate: 'ABC-123',
            phone: '+1-555-0123'
          },
          eta: '8 minutes'
        })
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch trip:', error)
        setLoading(false)
      }
    }

    fetchTrip()
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchTrip, 10000)
    return () => clearInterval(interval)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trip details...</p>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Trip not found</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'requested': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'requested': return 'Finding Driver...'
      case 'accepted': return 'Driver Assigned'
      case 'in_progress': return 'Trip in Progress'
      case 'completed': return 'Trip Completed'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Trip Tracking</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Status */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
              {getStatusText(trip.status)}
            </span>
            {trip.status === 'accepted' && (
              <span className="text-lg font-semibold text-green-600">
                ETA: {trip.eta}
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Pickup</p>
                <p className="text-gray-600">{trip.pickup_location}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Drop-off</p>
                <p className="text-gray-600">{trip.dropoff_location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="card mb-6">
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🗺️</div>
              <p>Live Map View</p>
              <p className="text-sm">Real-time tracking will be integrated here</p>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        {trip.driver && (
          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-4">Your Driver</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍✈️</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{trip.driver.name}</h4>
                <p className="text-gray-600">{trip.driver.car_model}</p>
                <p className="text-gray-600">{trip.driver.license_plate}</p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="ml-1 text-sm">{trip.driver.rating}</span>
                </div>
              </div>
              <button 
                onClick={() => window.open(`tel:${trip.driver.phone}`)}
                className="btn-primary"
              >
                Call Driver
              </button>
            </div>
          </div>
        )}

        {/* Trip Details */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Trip ID</span>
              <span className="font-medium">#{trip.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fare</span>
              <span className="font-medium">${trip.fare}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment</span>
              <span className="font-medium">Card ending in 1234</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TripTracking