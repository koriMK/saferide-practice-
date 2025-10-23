import { useState, useRef, useEffect } from 'react'
import { loadGoogleMaps } from '../utils/loadGoogleMaps'

const LocationInput = ({ placeholder, value, onChange, onPlaceSelect }) => {
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        await loadGoogleMaps()
        if (inputRef.current) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'ke' },
            fields: ['place_id', 'geometry', 'name', 'formatted_address']
          })

          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace()
            if (place.geometry) {
              onPlaceSelect({
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                placeId: place.place_id
              })
            }
          })
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load Google Maps:', error)
        setIsLoading(false)
      }
    }

    initializeAutocomplete()
  }, [onPlaceSelect])

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400 text-white"
    />
  )
}

export default LocationInput