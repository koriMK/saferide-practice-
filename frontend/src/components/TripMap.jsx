import { useEffect, useRef } from 'react';
import { createTripMap } from '../services/googleServices';

const TripMap = ({ pickup, destination, className = "w-full h-96" }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!pickup || !destination) return;

    const initMap = async () => {
      try {
        await createTripMap('trip-map', pickup, destination);
      } catch (error) {
        console.error('Map initialization failed:', error);
      }
    };

    initMap();
  }, [pickup, destination]);

  return <div id="trip-map" ref={mapRef} className={`${className} rounded-lg bg-gray-800`} />;
};

export default TripMap;