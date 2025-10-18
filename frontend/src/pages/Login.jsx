import { useState } from 'react';
import GoogleAuth from '../components/GoogleAuth';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = (data) => {
    console.log('Login successful:', data);
    // Handle successful login
  };

  const handleGoogleError = (error) => {
    console.error('Login failed:', error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <h1 className="text-white text-2xl mb-6 text-center">SafeRide Login</h1>
        
        <GoogleAuth 
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
        
        {loading && (
          <div className="mt-4 text-center text-gray-400">
            Signing in...
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;