import React from 'react';

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
      {/* Fancy loader with gradient */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-blue-200 border-b-blue-600 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
      </div>
      
      <p className="mt-6 text-gray-700 font-medium">{message}</p>
      <p className="text-gray-500 text-sm mt-2">Please wait while we process your request</p>
    </div>
  );
};

export default LoadingState;