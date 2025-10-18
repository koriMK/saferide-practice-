import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const DriverLanding = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [currentBg, setCurrentBg] = useState(0)
  
  const backgroundImages = [
    '/assets/background1.jpg',
    '/assets/background2.jpg', 
    '/assets/background3.jpg'
  ]
  const fullText = 'Drive. Earn. Thrive.\\nJoin SafeRide Drivers.'

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % backgroundImages.length)
    }, 4000)
    return () => clearInterval(bgInterval)
  }, [])

  useEffect(() => {
    const startTypewriter = () => {
      setTypewriterText('')
      let index = 0
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setTypewriterText(fullText.slice(0, index + 1))
          index++
        } else {
          clearInterval(timer)
          setTimeout(startTypewriter, 3000)
        }
      }, 100)
    }
    startTypewriter()
  }, [])

  return (
    <div>
      {/* Header */}
      <header>
        <div className="fixed top-0 w-full h-[60px] z-[101] bg-white shadow-sm">
          <div className="container max-w-[1184px] h-full flex justify-between items-center px-6 py-3 mx-auto">
            <div className="text-2xl font-bold text-green-600">SafeRide Driver</div>
            <div className="flex gap-4 items-center">
              <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">About</Link>
              <Link to="/support" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">Support</Link>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">Dashboard</Link>
                  <button 
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <article>
          {/* Hero Section */}
          <div id="driverSignupHero">
            <div id="headerContent">
              <div className="flex w-full min-h-[680px] py-[120px] md:py-10 bg-gray-900 relative block">
                <div className="absolute inset-0 w-full h-full">
                  {backgroundImages.map((bg, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                        index === currentBg ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ backgroundImage: `url(${bg})` }}
                    />
                  ))}
                </div>
                <div className="w-full h-full absolute inset-0 bg-gradient-to-t md:bg-gradient-to-br from-black/60 to-black/20"></div>
                <div className="container max-w-[1184px] px-6 flex relative grow items-end md:items-center mx-auto">
                  <div className="mb-0 max-w-[560px] flex flex-col md:items-start text-white md:pr-7 transition">
                    <h1 className="font-semibold mt-0 text-5xl md:text-7xl mb-0 md:mb-6">
                      {typewriterText.split('\\n').map((line, index) => (
                        <span key={index}>
                          {line.includes('SafeRide') ? (
                            <span className="text-green-400">{line}</span>
                          ) : (
                            line
                          )}
                          {index < typewriterText.split('\\n').length - 1 && <br />}
                        </span>
                      ))}
                      <span className="animate-pulse">|</span>
                    </h1>
                    <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-8">Join thousands of drivers earning flexible income. Drive on your schedule, keep your car, earn more.</p>
                    
                    <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 md:gap-y-0">
                      {isAuthenticated ? (
                        <Link to="/dashboard" className="bg-white hover:bg-gray-100 text-green-600 font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Go to Dashboard</Link>
                      ) : (
                        <Link to="/signup?role=driver" className="bg-white hover:bg-gray-100 text-green-600 font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Start Driving</Link>
                      )}
                      <Link to="/login" className="border-2 border-white hover:bg-white hover:text-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Login</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Features Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <div className="flex w-full shrink-0">
              <div className="flex flex-col max-w-[752px]">
                <div className="flex flex-col">
                  <div className="flex flex-col w-full gap-y-6">
                    <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-0 !mb-2 md:max-w-[679px]">Everything you need to drive with SafeRide</h3>
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col w-full gap-y-6">
                        <div className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600">Complete onboarding, manage trips, and track earnings all in one place.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-32 md:mb-40"></div>
            <div className="flex flex-col gap-y-8">
              <div className="grid gap-12 grid-cols-1 md:grid-cols-3">
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C13.1046 2 14 2.89543 14 4V6H16C17.1046 6 18 6.89543 18 8V10H20C21.1046 10 22 10.8954 22 12V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V12C2 10.8954 2.89543 10 4 10H6V8C6 6.89543 6.89543 6 8 6H10V4C10 2.89543 10.8954 2 12 2Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Sign Up & KYC</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Quick registration and document upload. Submit your license, ID, and insurance for verification.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Go Online/Offline</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Control your availability with a simple toggle. Work when you want, take breaks when you need.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Receive Trip Requests</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Get notified of nearby passengers who need a designated driver. Accept trips that work for you.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-12 grid-cols-1 md:grid-cols-3 mt-12">
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Navigate & Drive</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Accept trips and navigate to passenger locations. Drive their car safely to their destination.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Update Trip Progress</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Keep passengers informed with real-time updates: arrived, started, and trip completed.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-3.84 3.11-4.1V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 4.15-3.12 4.16z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Receive Payouts</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Track your earnings and receive weekly payouts. View detailed summaries of your trips and income.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <section className="rounded-lg text-white overflow-hidden bg-green-600">
              <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden md:gap-x-4 md:min-h-[560px]">
                <div className="flex flex-col justify-center pl-4 pr-4 pt-10 md:pt-8 md:pb-8 w-full mb-8 md:mb-0 md:pl-24 md:pr-0 text-white">
                  <div className="flex flex-col md:gap-y-8 gap-y-6">
                    <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-0">Ready to start earning?</h3>
                    <div className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0">Join SafeRide drivers and start earning flexible income today.</div>
                    <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 md:gap-y-0">
                      <Link to="/signup?role=driver" className="bg-white hover:bg-gray-100 text-green-600 font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Get Started</Link>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-end w-full h-full">
                  <img 
                    src="/assets/drivewithsaferide.jpg" 
                    alt="Drive with SafeRide" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </section>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-600 px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl text-white font-bold text-lg flex-shrink-0">
                S
              </div>
              <div>
                <div className="text-gray-900 font-bold">SafeRide</div>
                <div className="text-sm text-gray-600">Designated driver services</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
              Your trusted designated driver service. Safe, reliable, and professional drivers available 24/7.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-gray-900 text-sm font-semibold mb-2">For Drivers</h4>
              <ul className="space-y-2">
                <li><Link to="/signup?role=driver" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Sign Up to Drive</Link></li>
                <li><Link to="/login" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Driver Login</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Driver Requirements</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Earnings</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 text-sm font-semibold mb-2">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/support" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Help Center</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Safety</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Report Issue</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 text-sm font-semibold mb-2">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>+254 712 345 678</li>
                <li>drivers@saferide.com</li>
                <li>Nairobi, Kenya</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-7 flex justify-between items-center gap-4 flex-wrap border-t border-gray-200 pt-5">
          <div className="flex gap-4 items-center">
            <small className="text-gray-500">© 2024 SafeRide. All rights reserved.</small>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="flex gap-3">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 7.6c-.6.3-1.2.6-1.9.7.7-.4 1.2-1.1 1.4-1.9-.7.4-1.6.7-2.5.9C16.1 6.2 15 5.8 13.8 5.8 11.5 5.8 9.7 7.6 9.7 9.9c0 .3 0 .6.1.9C6.8 10.6 4.2 9 2.5 6.8c-.3.5-.4 1.1-.4 1.6 0 1.2.6 2.3 1.6 3-.5 0-1-.1-1.4-.4 0 1.8 1.3 3.3 3 3.7-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.6 2 2.8 3.8 2.9-1.4 1.1-3.1 1.8-5 1.8-.3 0-.6 0-.9-.1 1.8 1.2 3.8 1.9 6 1.9 7.2 0 11.1-6 11.1-11.1v-.5c.8-.6 1.4-1.3 1.9-2.1-.8.3-1.6.6-2.5.7z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.1C22 6.6 17.5 2.1 12 2.1S2 6.6 2 12.1c0 4.9 3.6 8.9 8.2 9.8v-6.9H7.8v-2.9h2.4V9.3c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4v1.7h2.5l-.4 2.9h-2v6.9c4.6-.9 8.2-5 8.2-9.8z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm4.8-2.6a1.12 1.12 0 1 0 0 2.24 1.12 1.12 0 0 0 0-2.24z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DriverLanding