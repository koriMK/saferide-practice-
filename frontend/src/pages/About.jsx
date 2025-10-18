import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const About = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false)
  
  const images = [
    '/assets/drivewithsaferide.jpg',
    '/saferide2.jpg',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* Header */}
      <header>
        <div className="fixed top-0 w-full h-[60px] z-[101] bg-white shadow-sm">
          <div className="container max-w-[1184px] h-full flex justify-between items-center px-6 py-3 mx-auto">
            <Link to="/" className="text-2xl font-bold text-gray-900">SafeRide</Link>
            <div className="flex gap-4 items-center">
              <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">Home</Link>
              <span className="text-gray-900 font-semibold hidden sm:block">About</span>
              <Link to="/support" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">Support</Link>
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <article>
          {/* Hero Section */}
          <div className="pt-[60px]">
            <div className="flex w-full min-h-[680px] py-[120px] md:py-10 bg-white relative">
              <div className="container max-w-[1184px] px-6 flex relative grow items-center mx-auto">
                <div className="w-full text-center">
                  <h1 className="font-semibold mt-0 text-5xl md:text-7xl mb-6 text-gray-900">About SafeRide</h1>
                  <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600 max-w-3xl mx-auto">Your trusted partner in safe, reliable designated driver services across Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <div className="flex flex-col md:flex-row md:gap-x-28 md:items-center">
              <div className="relative overflow-hidden w-full h-auto md:max-w-[560px] mb-12 md:mb-0">
                <div className="relative w-full h-96">
                  {images.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`SafeRide Service ${index + 1}`}
                      className={`w-full h-96 rounded-lg object-cover absolute top-0 left-0 transition-all duration-700 ${
                        index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full md:max-w-[464px]">
                <div className="flex flex-col gap-y-8">
                  <div className="flex flex-col">
                    <h4 className="font-semibold mt-0 text-2xl md:text-4xl mb-0">Our Mission</h4>
                    <div className="flex flex-col w-full gap-y-6 mt-6">
                      <div className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600">SafeRide was founded with a simple yet powerful mission: to provide safe, reliable transportation solutions when you need them most.</div>
                      <div className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600">We understand that life happens, and sometimes you need a professional driver to get you and your vehicle home safely.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose SafeRide Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col">
                <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-0 text-center">Why Choose SafeRide?</h3>
              </div>
              <div className="grid gap-12 grid-cols-1 md:grid-cols-3">
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 1C8.55228 1 9 1.44772 9 2V4H15V2C15 1.44772 15.4477 1 16 1C16.5523 1 17 1.44772 17 2V4H20C21.1046 4 22 4.89543 22 6V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V6C2 4.89543 2.89543 4 4 4H7V2C7 1.44772 7.44771 1 8 1ZM15 6V8C15 8.55228 15.4477 9 16 9C16.5523 9 17 8.55228 17 8V6H20V10H4V6H7V8C7 8.55228 7.44771 9 8 9C8.55228 9 9 8.55228 9 8V6H15Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Professional Drivers</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">All our drivers are thoroughly background-checked, licensed, and trained professionals committed to your safety.</p>
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
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">24/7 Availability</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Whether it's late night, early morning, or any time in between, SafeRide is available when you need us most.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex gap-4 flex-col md:flex-col">
                    <div className="text-gray-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.4] text-green-500">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.00198 11.4348C2.00202 11.215 2.03828 10.9968 2.10932 10.7888L4.38527 4.12507C4.59909 3.49909 5.10861 3.01927 5.74634 2.84344C7.78389 2.28167 9.86995 2.00098 12.002 2.00098C14.1339 2.00098 16.2189 2.28163 18.2542 2.84342C18.8916 3.01931 19.4008 3.49886 19.6147 4.12445L21.8925 10.7883C21.9637 10.9966 22 11.2152 22 11.4352C22 14.2918 22 17.1461 22 20.001C22 21.1053 21.1043 22.001 20 22.001C18.8957 22.001 18 21.1053 18 20.001V18.8661C16.0251 19.2891 14.0247 19.501 12 19.501C9.9753 19.501 7.97494 19.2891 6 18.8661V20.001C6 21.1053 5.10429 22.001 4 22.001C2.89571 22.001 2 21.1053 2 20.001C2 17.1456 2.00148 14.2902 2.00198 11.4348ZM6.27791 4.77152C8.14056 4.25795 10.0478 4.00098 12.002 4.00098C13.9562 4.00098 15.8621 4.25793 17.7222 4.77136L19.5098 10.001H4.49182L6.27791 4.77152ZM5.5 16.0971C6.32843 16.0971 7 15.4255 7 14.5971C7 13.7687 6.32843 13.0971 5.5 13.0971C4.67157 13.0971 4 13.7687 4 14.5971C4 15.4255 4.67157 16.0971 5.5 16.0971ZM20 14.5971C20 15.4255 19.3284 16.0971 18.5 16.0971C17.6716 16.0971 17 15.4255 17 14.5971C17 13.7687 17.6716 13.0971 18.5 13.0971C19.3284 13.0971 20 13.7687 20 14.5971Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold mt-0 text-base md:text-lg mb-0 mb-2">Your Car, Safe</h6>
                      <div className="flex flex-col gap-y-4">
                        <p className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">Unlike traditional ride services, we drive YOUR car, ensuring both you and your vehicle arrive safely at your destination.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col">
                <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-0 text-center">Our Story</h3>
              </div>
              <div className="max-w-4xl mx-auto space-y-8">
                <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600">SafeRide was born from a real need experienced by our founders. After a night out with friends, they found themselves in a common dilemma: how to get home safely without leaving their car behind.</p>
                <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600">This experience sparked the idea for SafeRide - a service where professional, vetted drivers come to you and drive your own car to your destination. Since our launch, we've helped thousands of customers get home safely.</p>
                <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600">Today, SafeRide operates in multiple cities across Kenya, with a growing network of professional drivers who share our commitment to safety, reliability, and exceptional service.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <section className="rounded-lg text-white overflow-hidden bg-green-600">
              <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden md:gap-x-4 md:min-h-[560px]">
                <div className="flex flex-col justify-center pl-4 pr-4 pt-10 md:pt-8 md:pb-8 w-full mb-8 md:mb-0 md:pl-24 md:pr-0 text-white">
                  <div className="flex flex-col md:gap-y-8 gap-y-6">
                    <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-0">Ready to Experience SafeRide?</h3>
                    <div className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0">Join thousands who trust SafeRide for safe, reliable transportation</div>
                    <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4 md:gap-y-0">
                      <Link to="/ride" className="bg-white hover:bg-gray-100 text-green-600 font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Order a Driver</Link>
                      <Link to="/signup?role=driver" className="border-2 border-white hover:bg-white hover:text-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Become a Driver</Link>
                    </div>
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
      <footer>
        <div className="container max-w-[1184px] px-6 py-20 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col items-start">
              <div className="text-2xl font-bold mb-4 text-green-600">SafeRide</div>
              <p className="text-gray-600 mb-4">Your trusted designated driver service. Safe, reliable, and professional drivers available 24/7.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">Instagram</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/ride" className="hover:text-gray-900">Request Driver</Link></li>
                <li><Link to="/signup?role=driver" className="hover:text-gray-900">Become a Driver</Link></li>
                <li><a href="#" className="hover:text-gray-900">Corporate Services</a></li>
                <li><a href="#" className="hover:text-gray-900">Event Services</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/support" className="hover:text-gray-900">Help Center</Link></li>
                <li><a href="#" className="hover:text-gray-900">Safety</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Report Issue</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>+254 712 345 678</li>
                <li>support@saferide.com</li>
                <li>Nairobi, Kenya</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 SafeRide. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-500 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Terms of Service</a>
              <a href="#" className="hover:text-gray-700">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default About