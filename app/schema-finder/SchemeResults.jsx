import React, { useState } from 'react';
import { Award, Search, SlidersHorizontal, Grid, List, ArrowDownAZ, Filter } from 'lucide-react';
import SchemeCard from './SchemeCard';

const SchemeResults = ({ schemes, getSchemeDetails }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  
  if (schemes.length === 0) return null;
  
  // Sort schemes based on selected option
  const sortedSchemes = [...schemes].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'year') {
      return b.launchYear - a.launchYear;
    }
    // Default: relevance (as returned by API)
    return 0;
  });
  
  return (
    <div className="animate-fadeIn">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2 shadow-md">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Found {schemes.length} Relevant Schemes
              </h2>
              <p className="text-gray-600 text-sm">Based on your selected criteria</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View mode toggle */}
            <div className="bg-gray-100 rounded-lg p-1 flex items-center">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-100 border-0 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="name">Sort by: Name</option>
                <option value="year">Sort by: Latest</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ArrowDownAZ className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSchemes.map((scheme, index) => (
            <SchemeCard 
              key={index} 
              scheme={scheme} 
              onClick={getSchemeDetails} 
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedSchemes.map((scheme, index) => (
            <div 
              key={index}
              onClick={() => getSchemeDetails(scheme)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 p-4 flex gap-4 cursor-pointer"
            >
              <div className={`rounded-full p-3 bg-gradient-to-br from-${scheme.color || 'blue'}-500 to-${scheme.color || 'indigo'}-600 shadow-md self-start`}>
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-indigo-600 transition-colors">
                  {scheme.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {scheme.description}
                </p>
                <div className="flex flex-wrap gap-2 items-center text-sm">
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    {scheme.category}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{scheme.level}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{scheme.ministry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SchemeResults;