import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Support = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(0)

  const faqs = [
    {
      question: "How does SafeRide work?",
      answer: "SafeRide provides professional drivers who come to your location and drive your own car to your destination, ensuring both you and your vehicle arrive safely."
    },
    {
      question: "Are your drivers background checked?",
      answer: "Yes, all SafeRide drivers undergo comprehensive background checks, license verification, and safety training before joining our platform."
    },
    {
      question: "What if my car gets damaged?",
      answer: "SafeRide carries comprehensive insurance coverage for all rides. Any damages are fully covered under our insurance policy."
    },
    {
      question: "How much does SafeRide cost?",
      answer: "Pricing varies by distance and time. You'll see the exact fare before confirming your ride request."
    },
    {
      question: "What areas do you serve?",
      answer: "SafeRide currently operates in major cities across Kenya including Nairobi, Mombasa, Kisumu, and Nakuru. We're expanding to more cities soon."
    }
  ]

  return (
    <div>
      {/* Header */}
      <header>
        <div className="fixed top-0 w-full h-[60px] z-[101] bg-white shadow-sm">
          <div className="container max-w-[1184px] h-full flex justify-between items-center px-6 py-3 mx-auto">
            <Link to="/" className="text-2xl font-bold text-gray-900">SafeRide</Link>
            <div className="flex gap-4 items-center">
              <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">About</Link>
              <span className="text-gray-900 font-semibold hidden sm:block">Support</span>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">Dashboard</Link>
                  <button 
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
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
          <div className="pt-[60px]">
            <div className="flex w-full min-h-[680px] py-[120px] md:py-10 bg-white relative">
              <div className="container max-w-[1184px] px-6 flex relative grow items-center mx-auto">
                <div className="w-full text-center">
                  <h1 className="font-semibold mt-0 text-5xl md:text-7xl mb-6 text-gray-900">Support Center</h1>
                  <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600">We're here to help you 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <section id="contact" className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
              <div className="w-full">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h2 className="font-semibold mt-0 text-2xl md:text-3xl mb-6 text-gray-900">Contact Us</h2>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                          <path d="M22 16.92V19.92C22 20.92 21.11 21.92 20 21.92C10.39 21.92 2.08 13.61 2.08 4C2.08 2.89 3.08 2 4.08 2H7.08C7.58 2 8.08 2.4 8.08 2.9C8.08 4.4 8.38 5.87 8.93 7.22C9.08 7.57 8.98 7.98 8.68 8.28L7.08 9.88C8.58 12.67 11.33 15.42 14.12 16.92L15.72 15.32C16.02 15.02 16.43 14.92 16.78 15.07C18.13 15.62 19.6 15.92 21.1 15.92C21.6 15.92 22 16.42 22 16.92Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">24/7 Support Hotline</p>
                        <a href="tel:+254712345678" className="text-green-600 hover:text-green-700 font-medium">+254 712 345 678</a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                          <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Email Support</p>
                        <a href="mailto:support@saferide.com" className="text-green-600 hover:text-green-700 font-medium">support@saferide.com</a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM18 14H6V12H18V14ZM18 11H6V9H18V11ZM18 8H6V6H18V8Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Live Chat</p>
                        <p className="text-gray-600">Available on our mobile app</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="emergency" className="w-full">
                <div className="bg-red-50 p-8 rounded-lg">
                  <h2 className="font-semibold mt-0 text-2xl md:text-3xl mb-6 text-gray-900">Emergency Support</h2>
                  <div className="space-y-4">
                    <div className="bg-red-100 p-4 rounded-lg">
                      <p className="font-semibold text-red-800">Emergency Hotline</p>
                      <a href="tel:999" className="text-red-600 text-xl font-bold">999</a>
                      <p className="text-sm text-red-700 mt-2">For immediate emergencies, always call 999 first</p>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <p className="font-semibold text-orange-800">SafeRide Emergency</p>
                      <a href="tel:+254712345999" className="text-orange-600 text-xl font-bold">+254 712 345 999</a>
                      <p className="text-sm text-orange-700 mt-2">For ride-related emergencies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Section */}
          <section id="safety" className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-semibold mt-0 text-3xl md:text-5xl mb-6 text-gray-900">Safety First</h2>
              <p className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-0 text-gray-600 max-w-3xl mx-auto">
                Your safety is our top priority. All drivers are thoroughly vetted and our platform includes multiple safety features.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Background Checks</h3>
                <p className="text-gray-600">All drivers undergo comprehensive background verification and license validation.</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Real-time Tracking</h3>
                <p className="text-gray-600">Track your ride in real-time and share your location with trusted contacts.</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">24/7 Support</h3>
                <p className="text-gray-600">Emergency support available round the clock for any safety concerns.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <div className="flex flex-col items-center md:max-w-[752px] md:mx-auto">
              <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-0 !mb-10 text-center text-gray-900">Frequently Asked Questions</h3>
              <div className="flex flex-col gap-2 items-center w-full">
                {faqs.map((faq, index) => (
                  <div key={index} className="w-full text-gray-900 border-gray-200 rounded-lg border border-solid p-4">
                    <h3 className="font-semibold mt-0 text-base md:text-lg mb-2">
                      <div 
                        className="flex text-left content-between items-center w-full cursor-pointer gap-4"
                        onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                      >
                        <span>{faq.question}</span>
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`ml-auto transition-transform shrink-0 ${expandedFaq === index ? 'scale-y-[-1]' : ''}`}
                        >
                          <path fillRule="evenodd" clipRule="evenodd" d="M19.7108 8.71294C19.3201 8.32241 18.6867 8.32241 18.296 8.71294L12.0038 15.002L5.71161 8.71294C5.32092 8.32241 4.68749 8.32241 4.2968 8.71294C3.90611 9.10346 3.90611 9.73663 4.2968 10.1272L10.589 16.4163C11.3704 17.1973 12.6372 17.1973 13.4186 16.4163L19.7108 10.1272C20.1015 9.73663 20.1015 9.10346 19.7108 8.71294Z" fill="currentColor"></path>
                        </svg>
                      </div>
                    </h3>
                    <div className={`transition-all overflow-hidden ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="mt-0 text-base leading-6 font-normal mb-0 text-gray-600">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container max-w-[1184px] px-6 mb-32 md:mb-40 mx-auto">
            <section className="rounded-lg text-white overflow-hidden bg-green-600">
              <div className="text-center py-16 px-8">
                <h3 className="font-semibold mt-0 text-3xl md:text-5xl mb-6">Need More Help?</h3>
                <div className="mt-0 text-lg md:text-xl leading-[1.625rem] md:leading-7 font-normal mb-8">Our support team is available 24/7 to assist you</div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+254712345678" className="bg-white hover:bg-gray-100 text-green-600 font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Call Support</a>
                  <a href="mailto:support@saferide.com" className="border-2 border-white hover:bg-white hover:text-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors inline-block text-center">Email Us</a>
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
                <li><span className="text-gray-900 font-medium">Help Center</span></li>
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

export default Support