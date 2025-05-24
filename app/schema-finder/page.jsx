'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the actual page component with no SSR
const SchemaFinderPage = dynamic(() => import('./SchemaFinderPage'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="text-center">
        <div className="inline-block relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 mt-4 text-lg">Loading application...</p>
      </div>
    </div>
  )
});

// This is just a wrapper that ensures the page only renders on client-side
export default function Page() {
  return <SchemaFinderPage />;
}