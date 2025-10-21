import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle login logic here
    console.log('Login attempt:', formData);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-400 mb-2">SafeRide</h1>
          <p className="text-gray-300">Welcome back</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>

            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400"
              required
            />
          </div>
          
          <div>

            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-green-400"
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mt-6 space-y-4">
          <p className="text-gray-400">
            Don't have an account?
          </p>
          <div className="space-y-2">
            <Link to="/signup" className="block text-green-400 hover:text-green-300">Sign up as User</Link>
            <Link to="/signup?role=driver" className="block text-green-400 hover:text-green-300">Become a Driver</Link>
            <Link to="/signup?role=admin" className="block text-green-400 hover:text-green-300">Admin Access</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;