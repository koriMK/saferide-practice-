export const initGoogleSignIn = () => {
  return new Promise((resolve) => {
    if (window.google?.accounts) {
      resolve(window.google.accounts);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => resolve(window.google.accounts);
    document.head.appendChild(script);
  });
};

export const renderGoogleSignIn = async (elementId, callback) => {
  const google = await initGoogleSignIn();
  
  google.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback
  });

  google.id.renderButton(
    document.getElementById(elementId),
    {
      theme: 'filled_black',
      size: 'large',
      width: '100%'
    }
  );
};

export const handleGoogleResponse = async (response) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential })
    });
    return await res.json();
  } catch (error) {
    throw new Error('Google sign-in failed');
  }
};