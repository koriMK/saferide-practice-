const TripMap = ({ pickup, destination, className = "w-full h-96" }) => {
  return (
    <div className={`${className} rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center`}>
      <div className="text-center text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="text-sm font-medium">Trip Map</p>
        {pickup && destination && (
          <p className="text-xs mt-1">{pickup} → {destination}</p>
        )}
      </div>
    </div>
  );
};

export default TripMap;