import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places", "geometry"]
});

export const initMap = async (elementId, center = { lat: -1.286389, lng: 36.817223 }) => {
  const { Map } = await loader.importLibrary("maps");
  return new Map(document.getElementById(elementId), {
    zoom: 13,
    center,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }
    ]
  });
};

export const addMarker = async (map, position, title, icon = null) => {
  const { Marker } = await loader.importLibrary("maps");
  return new Marker({
    position,
    map,
    title,
    icon
  });
};

export const calculateRoute = async (origin, destination) => {
  const { DirectionsService } = await loader.importLibrary("routes");
  const directionsService = new DirectionsService();
  
  return new Promise((resolve, reject) => {
    directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === 'OK') resolve(result);
      else reject(status);
    });
  });
};