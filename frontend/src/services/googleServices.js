// Google Sign-In
export const initGoogleAuth = () => {
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

// Google Maps
export const loadGoogleMaps = () => {
  return new Promise((resolve) => {
    if (window.google?.maps) {
      resolve(window.google.maps);
      return;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.onload = () => resolve(window.google.maps);
    document.head.appendChild(script);
  });
};

// Create map with markers
export const createTripMap = async (elementId, pickup, destination) => {
  await loadGoogleMaps();
  
  const map = new google.maps.Map(document.getElementById(elementId), {
    zoom: 13,
    center: pickup,
    styles: [{ elementType: "geometry", stylers: [{ color: "#1a1a1a" }] }]
  });

  new google.maps.Marker({ position: pickup, map, title: 'Pickup' });
  new google.maps.Marker({ position: destination, map, title: 'Destination' });

  return map;
};