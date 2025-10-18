import TripMap from '../components/TripMap';

const TripView = () => {
  const pickup = { lat: -1.286389, lng: 36.817223 }; // Nairobi
  const destination = { lat: -1.292066, lng: 36.821946 }; // Nearby location

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-2xl mb-6">Your Trip</h1>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-white text-lg mb-4">Route</h2>
          <TripMap pickup={pickup} destination={destination} />
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-gray-300">
              <p className="font-semibold">Pickup</p>
              <p className="text-sm">Nairobi CBD</p>
            </div>
            <div className="text-gray-300">
              <p className="font-semibold">Destination</p>
              <p className="text-sm">Westlands</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripView;