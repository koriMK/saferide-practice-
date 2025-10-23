import { loadGoogleMaps } from '../utils/loadGoogleMaps'

class LocationService {
  constructor() {
    this.geocoder = null
    this.directionsService = null
    this.initialized = false
  }

  async initializeServices() {
    if (!this.initialized) {
      await loadGoogleMaps()
      this.geocoder = new window.google.maps.Geocoder()
      this.directionsService = new window.google.maps.DirectionsService()
      this.initialized = true
    }
  }

  async calculateDistance(pickup, dropoff) {
    await this.initializeServices()
    
    return new Promise((resolve, reject) => {
      if (!this.directionsService) {
        reject(new Error('Google Maps not loaded'))
        return
      }

      this.directionsService.route({
        origin: pickup,
        destination: dropoff,
        travelMode: window.google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === 'OK') {
          const route = result.routes[0]
          const distance = route.legs[0].distance.value / 1000 // Convert to km
          const duration = route.legs[0].duration.value / 60 // Convert to minutes
          
          resolve({
            distance: distance,
            duration: duration,
            route: result
          })
        } else {
          reject(new Error('Could not calculate route'))
        }
      })
    })
  }

  calculatePrice(distance, duration) {
    const basePrice = 100 // KSh 100 base fare
    const pricePerKm = 50 // KSh 50 per km
    const pricePerMinute = 5 // KSh 5 per minute
    
    const distancePrice = distance * pricePerKm
    const timePrice = duration * pricePerMinute
    
    return Math.round(basePrice + distancePrice + timePrice)
  }

  async getPriceEstimate(pickup, dropoff) {
    try {
      const routeData = await this.calculateDistance(pickup, dropoff)
      const price = this.calculatePrice(routeData.distance, routeData.duration)
      
      return {
        price,
        distance: routeData.distance,
        duration: routeData.duration,
        route: routeData.route
      }
    } catch (error) {
      throw new Error('Unable to calculate price: ' + error.message)
    }
  }
}

export const locationService = new LocationService()