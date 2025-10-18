// Nairobi bounds for location restriction
const NAIROBI_BOUNDS = {
  north: -1.163,
  south: -1.444,
  east: 37.103,
  west: 36.650
}

// Common Nairobi locations for autocomplete
const NAIROBI_LOCATIONS = [
  'Westlands, Nairobi',
  'CBD, Nairobi',
  'Karen, Nairobi',
  'Kilimani, Nairobi',
  'Lavington, Nairobi',
  'Parklands, Nairobi',
  'South B, Nairobi',
  'South C, Nairobi',
  'Kasarani, Nairobi',
  'Embakasi, Nairobi',
  'Kileleshwa, Nairobi',
  'Runda, Nairobi',
  'Muthaiga, Nairobi',
  'Spring Valley, Nairobi',
  'JKIA, Nairobi',
  'Wilson Airport, Nairobi',
  'University of Nairobi',
  'Kenyatta University',
  'USIU, Nairobi',
  'Village Market, Nairobi',
  'Sarit Centre, Nairobi',
  'Junction Mall, Nairobi',
  'Two Rivers Mall, Nairobi'
]

class MapService {
  constructor() {
    this.isLoaded = false
    this.autocompleteService = null
    this.placesService = null
  }

  async loadGoogleMaps() {
    if (this.isLoaded) return Promise.resolve()

    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        this.initializeServices()
        resolve()
        return
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        console.error('Google Maps API key is missing')
        reject(new Error('Google Maps API key is missing'))
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&region=KE&language=en`
      script.async = true
      script.defer = true
      
      script.onload = () => {
        this.initializeServices()
        resolve()
      }
      
      script.onerror = () => {
        console.error('Failed to load Google Maps script')
        reject(new Error('Failed to load Google Maps'))
      }
      document.head.appendChild(script)
    })
  }

  initializeServices() {
    if (window.google && window.google.maps) {
      this.autocompleteService = new window.google.maps.places.AutocompleteService()
      this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'))
      this.isLoaded = true
    }
  }

  async searchLocations(query) {
    await this.loadGoogleMaps()
    
    // Filter local locations first
    const localMatches = NAIROBI_LOCATIONS.filter(location =>
      location.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3)

    if (!this.autocompleteService) {
      return localMatches.map(location => ({ description: location, place_id: null }))
    }

    return new Promise((resolve) => {
      this.autocompleteService.getPlacePredictions({
        input: query,
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(NAIROBI_BOUNDS.south, NAIROBI_BOUNDS.west),
          new window.google.maps.LatLng(NAIROBI_BOUNDS.north, NAIROBI_BOUNDS.east)
        ),
        strictBounds: true,
        componentRestrictions: { country: 'KE' },
        types: ['establishment', 'geocode']
      }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          const googleResults = predictions.slice(0, 5).map(prediction => ({
            description: prediction.description,
            place_id: prediction.place_id
          }))
          
          // Combine local and Google results
          const combined = [...localMatches.map(loc => ({ description: loc, place_id: null })), ...googleResults]
          resolve(combined.slice(0, 8))
        } else {
          resolve(localMatches.map(location => ({ description: location, place_id: null })))
        }
      })
    })
  }

  async getPlaceDetails(placeId) {
    if (!placeId || !this.placesService) return null

    return new Promise((resolve) => {
      this.placesService.getDetails({
        placeId: placeId,
        fields: ['geometry', 'formatted_address', 'name']
      }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
            name: place.name
          })
        } else {
          resolve(null)
        }
      })
    })
  }

  calculateDistance(pickup, dropoff) {
    // Simple distance calculation for Nairobi (approximate)
    const R = 6371 // Earth's radius in km
    const dLat = (dropoff.lat - pickup.lat) * Math.PI / 180
    const dLon = (dropoff.lng - pickup.lng) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(pickup.lat * Math.PI / 180) * Math.cos(dropoff.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  calculateFare(distance) {
    // SafeRide pricing for Nairobi
    const baseFare = 200 // KSh
    const perKmRate = 50 // KSh per km
    const serviceFee = 50 // KSh
    
    return Math.round(baseFare + (distance * perKmRate) + serviceFee)
  }
}

export const mapService = new MapService()