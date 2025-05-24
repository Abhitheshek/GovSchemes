"use client";

import React, { useEffect, useState } from 'react';

const LoadingAnimation = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // If not loading anymore, complete the progress bar quickly
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            
            // Fade out animation after progress reaches 100%
            setTimeout(() => {
              setShowAnimation(false);
              if (onLoadingComplete) onLoadingComplete();
            }, 500);
            
            return 100;
          }
          return newProgress;
        });
      }, 30);
      
      return () => clearInterval(interval);
    } else {
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          // Slow down as we approach 80%
          const increment = prev < 70 ? 2 : 0.5;
          const newProgress = Math.min(prev + increment, 80);
          return newProgress;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isLoading, onLoadingComplete]);

  if (!showAnimation) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-600 transition-opacity duration-500 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-blue-300/30"></div>
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-4 border-white animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-xl">{Math.round(progress)}%</span>
        </div>
      </div>
      
      <div className="w-64 h-2 bg-blue-700 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">GovSchemes</h2>
        <p className="text-blue-100 text-sm">Loading resources...</p>
      </div>
      
      {/* Government of India emblem */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="text-center">
          <div className="text-blue-100 text-xs mb-2">Government of India</div>
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs font-bold">GoI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;