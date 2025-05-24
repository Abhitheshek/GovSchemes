import React from 'react';
import { Search, Filter, ArrowRight, Sparkles } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="text-center py-16">
      
      
      {/* Steps */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
          <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Filter className="h-6 w-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">1. Set Filters</h4>
          <p className="text-gray-600 text-sm">Select your criteria from the available options</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
          <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Search className="h-6 w-6 text-indigo-600" />
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">2. Find Schemes</h4>
          <p className="text-gray-600 text-sm">Get AI-powered recommendations based on your needs</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
          <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <ArrowRight className="h-6 w-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">3. Explore Details</h4>
          <p className="text-gray-600 text-sm">Dive deeper into schemes that match your requirements</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;