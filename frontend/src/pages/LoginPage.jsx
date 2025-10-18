import GoogleSignInButton from '../components/GoogleSignInButton';

const LoginPage = () => {
  const handleGoogleSuccess = (userData) => {
    console.log('Google sign-in successful:', userData);
    // Handle successful login
  };

  const handleGoogleError = (error) => {
    console.error('Google sign-in failed:', error);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <h1 className="text-white text-2xl mb-6 text-center">SafeRide Login</h1>
        
        <GoogleSignInButton 
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
        
        <div className="mt-4 text-center">
          <span className="text-gray-400">or</span>
        </div>
        
        {/* Your existing email/password form */}
      </div>
    </div>
  );
};

export default LoginPage;