import { useEffect, useRef, useState } from 'react'
import { mapService } from '../services/mapService'

const LiveMap = ({ 
  pickupLocation, 
  dropoffLocation, 
  driverLocation, 
  tripStatus = 'idle',
  className = "w-full h-96"
}) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    initializeMap()
  }, [])

  useEffect(() => {
    if (isLoaded && mapInstanceRef.current) {
      updateMapMarkers()
    }
  }, [pickupLocation, dropoffLocation, driverLocation, tripStatus, isLoaded])

  const initializeMap = async () => {
    try {
      await mapService.loadGoogleMaps()
      
      if (mapRef.current && window.google) {
        // Center on Nairobi
        const nairobiCenter = { lat: -1.2921, lng: 36.8219 }
        
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          zoom: 12,
          center: nairobiCenter,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        })
        
        setIsLoaded(true)
      }
    } catch (error) {
      console.error('Failed to initialize map:', error)
      // Show fallback content
      if (mapRef.current) {
        mapRef.current.innerHTML = `
          <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
            <div class="text-center p-8">
              <div class="text-gray-400 mb-4">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Map Unavailable</h3>
              <p class="text-gray-600">Unable to load map. Please check your connection.</p>
            </div>
          </div>
        `
      }
    }
  }

  const updateMapMarkers = () => {
    if (!mapInstanceRef.current) return

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.setMap(null))
    markersRef.current = {}

    const bounds = new window.google.maps.LatLngBounds()
    let hasLocations = false

    // Add pickup marker
    if (pickupLocation?.lat) {
      markersRef.current.pickup = new window.google.maps.Marker({
        position: { lat: pickupLocation.lat, lng: pickupLocation.lng },
        map: mapInstanceRef.current,
        title: 'Pickup Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#10B981" stroke="white" stroke-width="3"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32)
        }
      })
      bounds.extend({ lat: pickupLocation.lat, lng: pickupLocation.lng })
      hasLocations = true
    }

    // Add dropoff marker
    if (dropoffLocation?.lat) {
      markersRef.current.dropoff = new window.google.maps.Marker({
        position: { lat: dropoffLocation.lat, lng: dropoffLocation.lng },
        map: mapInstanceRef.current,
        title: 'Destination',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#EF4444" stroke="white" stroke-width="3"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32)
        }
      })
      bounds.extend({ lat: dropoffLocation.lat, lng: dropoffLocation.lng })
      hasLocations = true
    }

    // Add driver marker (if trip is active)
    if (driverLocation?.lat && tripStatus !== 'idle') {
      markersRef.current.driver = new window.google.maps.Marker({
        position: { lat: driverLocation.lat, lng: driverLocation.lng },
        map: mapInstanceRef.current,
        title: 'Driver Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" fill="#3B82F6" stroke="white" stroke-width="4"/>
              <path d="M20 12L24 16H22V24H18V16H16L20 12Z" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40)
        }
      })
      bounds.extend({ lat: driverLocation.lat, lng: driverLocation.lng })
      hasLocations = true
    }

    // Draw route if both pickup and dropoff exist
    if (pickupLocation?.lat && dropoffLocation?.lat) {
      const directionsService = new window.google.maps.DirectionsService()
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#10B981',
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      })

      directionsRenderer.setMap(mapInstanceRef.current)

      directionsService.route({
        origin: { lat: pickupLocation.lat, lng: pickupLocation.lng },
        destination: { lat: dropoffLocation.lat, lng: dropoffLocation.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
        region: 'KE'
      }, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result)
        }
      })
    }

    // Fit map to show all markers
    if (hasLocations) {
      mapInstanceRef.current.fitBounds(bounds)
      
      // Ensure minimum zoom level
      const listener = window.google.maps.event.addListener(mapInstanceRef.current, 'bounds_changed', () => {
        if (mapInstanceRef.current.getZoom() > 15) {
          mapInstanceRef.current.setZoom(15)
        }
        window.google.maps.event.removeListener(listener)
      })
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 text-sm">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>Pickup</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span>Destination</span>
          </div>
          {tripStatus !== 'idle' && (
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span>Driver</span>
            </div>
          )}
        </div>
      </div>

      {/* Trip Status */}
      {tripStatus !== 'idle' && (
        <div className="absolute bottom-4 left-4 bg-gray-900 text-white rounded-lg px-4 py-2">
          <span className="text-sm font-medium">
            Status: {tripStatus.charAt(0).toUpperCase() + tripStatus.slice(1)}
          </span>
        </div>
      )}
    </div>
  )
}

export default LiveMap