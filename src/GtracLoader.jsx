import React from 'react';

const GTRACLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Spinning circles */}
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-teal-600 rounded-full opacity-25"></div>
        <div className="absolute w-16 h-16 border-4 border-transparent border-t-teal-600 rounded-full animate-spin"></div>
      </div>
      
      {/* Loading text */}
      <p className="mt-4 text-gray-600 text-sm">Loading data...</p>
    </div>
  );
};

export default GTRACLoader;