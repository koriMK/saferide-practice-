import { useEffect } from 'react';
import { initGoogleAuth } from '../services/googleServices';

const GoogleAuth = ({ onSuccess, onError }) => {
  useEffect(() => {
    const setupGoogle = async () => {
      try {
        const google = await initGoogleAuth();
        
        google.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse
        });

        google.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'filled_black', size: 'large', width: '100%' }
        );
      } catch (error) {
        onError?.(error);
      }
    };

    setupGoogle();
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
      });
      const data = await result.json();
      onSuccess?.(data);
    } catch (error) {
      onError?.(error);
    }
  };

  return <div id="google-signin-button" className="w-full" />;
};

export default GoogleAuth;