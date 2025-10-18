import { useEffect } from 'react';

const GoogleSignInButton = ({ onSuccess, onError }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'filled_black', size: 'large' }
      );
    };
    document.head.appendChild(script);
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const result = await fetch('/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
      });
      const data = await result.json();
      onSuccess(data);
    } catch (error) {
      onError(error);
    }
  };

  return <div id="google-signin-button" className="w-full" />;
};

export default GoogleSignInButton;