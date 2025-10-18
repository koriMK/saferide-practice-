import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const Landing = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [currentBg, setCurrentBg] = useState(0)
  
  const backgroundImages = [
    '/assets/background1.jpg',
    '/assets/background2.jpg', 
    '/assets/background3.jpg'
  ]
  const fullText = 'Your Car, Our Driver...Anytime, Anywhere.\nSafeRide.'

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
            <div className="text-2xl font-bold text-green-600">SafeRide</div>
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
                <div className="relative">
                  <button 
                    onClick={() => setShowRegisterDropdown(!showRegisterDropdown)}
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Register
                  </button>
                  {showRegisterDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                      <Link to="/signup?role=driver" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">Become a Driver</Link>
                    </div>
                  )}
                </div>
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
                      {typewriterText.split('\n').map((line, index) => (
                        <span key={index}>
                          {line.includes('SafeRide') ? (
                            <span className="text-green-400">{line}</span>
                          ) : (
                            line
                          )}
                          {index < typewriterText.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                      <span className="animate-pulse">|</span>
                    </h1>
                    <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-8">When you can't drive, we'll drive your car home safely. Professional designated drivers at your service 24/7.</p>
                    
                    <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 md:gap-y-0">
                      {isAuthenticated ? (
                        <Link to="/ride" className="bg-white hover:bg-gray-100 text-green-600 font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Order a Driver</Link>
                      ) : (
                        <Link to="/login" className="bg-white hover:bg-gray-100 text-green-600 font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Order a Driver</Link>
                      )}
                      {!isAuthenticated ? (
                        <Link to="/signup" className="border-2 border-white hover:bg-white hover:text-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Sign Up</Link>
                      ) : (
                        <Link to="/dashboard" className="border-2 border-white hover:bg-white hover:text-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Go to Dashboard</Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose SafeRide Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <div className="flex w-full shrink-0">
              <div className="flex flex-col max-w-[752px]">
                <div className="flex flex-col">
                  <div className="flex flex-col w-full gap-y-6">
                    <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-0 !mb-2 md:max-w-[679px]">Why choose SafeRide?</h3>
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col w-full gap-y-6">
                        <div className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600">Whether you need a ride home after a night out or want to ensure your car gets home safely, SafeRide provides professional designated drivers available 24/7.</div>
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
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 1C8.55228 1 9 1.44772 9 2V4H15V2C15 1.44772 15.4477 1 16 1C16.5523 1 17 1.44772 17 2V4H20C21.1046 4 22 4.89543 22 6V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V6C2 4.89543 2.89543 4 4 4H7V2C7 1.44772 7.44771 1 8 1ZM15 6V8C15 8.55228 15.4477 9 16 9C16.5523 9 17 8.55228 17 8V6H20V10H4V6H7V8C7 8.55228 7.44771 9 8 9C8.55228 9 9 8.55228 9 8V6H15Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Available 24/7</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Need a ride home at any hour? Our professional drivers are available around the clock to get you and your car home safely.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path d="M4 3C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H19C20.1046 21 21 20.1046 21 19V17H15C12.2386 17 10 14.7614 10 12C10 9.23858 12.2386 7 15 7H21V5C21 3.89543 20.1046 3 19 3H4Z" fill="currentColor"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 12C12 10.3431 13.3431 9 15 9H21C21.5523 9 22 9.44772 22 10V14C22 14.5523 21.5523 15 21 15H15C13.3431 15 12 13.6569 12 12ZM16.3252 10.5C15.4968 10.5 14.8252 11.1716 14.8252 12C14.8252 12.8284 15.4968 13.5 16.3252 13.5C17.1536 13.5 17.8252 12.8284 17.8252 12C17.8252 11.1716 17.1536 10.5 16.3252 10.5Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Your Car, Safe Journey</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Unlike ride-sharing, you keep your car with you. Our driver uses your vehicle to get you home safely.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.5 4C5.93497 4 4.38388 4.3692 2.85484 5.08461C2.31876 5.33543 2 5.87095 2 6.43444V16.5681C2 17.7087 3.1712 18.3606 4.12265 17.9619C5.26001 17.4852 6.38367 17.2536 7.5 17.2536C8.96532 17.2536 10.2013 17.7373 11.6259 18.3071C13.1933 18.9342 14.783 19.5036 16.4946 19.5036C18.0598 19.5036 19.6123 19.1344 21.144 18.4192C21.6807 18.1687 22 17.6329 22 17.0689V6.9321C22 5.79476 20.8333 5.14036 19.881 5.5378C18.7305 6.01788 17.6057 6.25 16.5 6.25C15.0318 6.25 13.7957 5.76626 12.3714 5.19652C10.803 4.56904 9.21258 4 7.5 4ZM15 11.7518C15 13.4087 13.6569 14.7518 12 14.7518C10.3431 14.7518 9 13.4087 9 11.7518C9 10.095 10.3431 8.75182 12 8.75182C13.6569 8.75182 15 10.095 15 11.7518Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Professional Drivers</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">All our drivers are background-checked, licensed professionals who prioritize your safety and your vehicle's security.</p>
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
                    <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-0">Ready for a safe ride home?</h3>
                    <div className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0">Book your designated driver in just a few taps.</div>
                  </div>
                </div>
                <div className="flex justify-end items-end w-full h-full">
                  <img 
                    src="/assets/drivewithsaferide.jpg" 
                    alt="SafeRide Service" 
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
              <h4 className="text-gray-900 text-sm font-semibold mb-2">Services</h4>
              <ul className="space-y-2">
                <li><Link to="/ride" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Request Driver</Link></li>
                <li><Link to="/signup?role=driver" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Become a Driver</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Corporate Services</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors">Event Services</a></li>
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
                <li>support@saferide.com</li>
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

export default Landing