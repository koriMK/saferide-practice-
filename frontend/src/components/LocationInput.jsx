import { useState, useEffect, useRef } from 'react'
import { mapService } from '../services/mapService'

const LocationInput = ({ 
  placeholder, 
  value, 
  onChange, 
  onLocationSelect,
  className = ""
}) => {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = async (e) => {
    const query = e.target.value
    onChange(query)

    if (query.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setLoading(true)
    try {
      const results = await mapService.searchLocations(query)
      setSuggestions(results)
      setShowSuggestions(true)
    } catch (error) {
      console.error('Location search error:', error)
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = async (suggestion) => {
    onChange(suggestion.description)
    setShowSuggestions(false)
    
    if (onLocationSelect) {
      let locationData = { address: suggestion.description }
      
      if (suggestion.place_id) {
        const details = await mapService.getPlaceDetails(suggestion.place_id)
        if (details) {
          locationData = { ...locationData, ...details }
        }
      }
      
      onLocationSelect(locationData)
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
        autoComplete="off"
      />
      
      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-900">{suggestion.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationInput