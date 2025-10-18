import { useEffect, useRef } from 'react';

const SimpleMap = ({ center, markers = [] }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    const map = new google.maps.Map(mapRef.current, {
      zoom: 13,
      center,
      styles: [{ elementType: "geometry", stylers: [{ color: "#1a1a1a" }] }]
    });

    markers.forEach(marker => {
      new google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title
      });
    });
  };

  return <div ref={mapRef} className="w-full h-96 rounded-lg" />;
};

export default SimpleMap;