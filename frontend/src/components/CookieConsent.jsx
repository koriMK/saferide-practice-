import { useState, useEffect } from 'react'
import { cookieService } from '../services/cookieService'

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = cookieService.getCookie('saferide_cookie_consent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    cookieService.setCookie('saferide_cookie_consent', 'accepted', 365)
    setShowConsent(false)
  }

  const declineCookies = () => {
    cookieService.setCookie('saferide_cookie_consent', 'declined', 365)
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            We use cookies to enhance your experience, remember your preferences, and keep you logged in. 
            By continuing to use SafeRide, you agree to our use of cookies.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent