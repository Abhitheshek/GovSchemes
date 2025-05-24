"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, MapPin, Building, CreditCard, Calendar, ChevronRight, Search, Filter, X, Info, Sparkles } from 'lucide-react';
import { getStatusColor, getCategoryOptions, getStatusOptions, getYearOptions } from './utils';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const SchemesPage = ({ 
  schemes, 
  loading, 
  setCurrentView, 
  generateSchemeDetails,
  searchQuery,
  onSearch,
  selectedFilters,
  onFilterChange
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredScheme, setHoveredScheme] = useState(null);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);
  
  const statusOptions = getStatusOptions();
  const categoryOptions = getCategoryOptions();
  const yearOptions = getYearOptions();

  const handleFilterToggle = (filterType, value) => {
    const currentValues = selectedFilters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange(filterType, newValues);
  };

  const clearFilters = () => {
    onFilterChange('status', []);
    onFilterChange('category', []);
    onFilterChange('year', []);
  };

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-50 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent"></div>
          <div className="relative">
            <div className="h-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg w-3/4 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg w-1/4 mb-3 animate-pulse"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg w-full animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg w-5/6 animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl"></div>
      </div>
      
      {/* Header Section */}
      <motion.div 
        style={{ 
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`
        }}
        className="sticky top-0 z-10 bg-white/70 border-b border-blue-100/50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => setCurrentView('main')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4 group px-3 py-1.5 rounded-lg hover:bg-blue-50/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </motion.button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  Available Schemes
                </h1>
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-md animate-ping"></div>
                  <Sparkles className="w-7 h-7 text-yellow-400 drop-shadow-md relative z-10" />
                </motion.div>
              </div>
              <p className="text-gray-600">Discover and explore government schemes tailored for you</p>
            </motion.div>
            
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative group"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full md:w-72 pl-10 pr-4 py-3 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white/70 backdrop-blur-sm focus:bg-white shadow-sm hover:shadow-md transition-all"
                />
                <div className="absolute inset-0 rounded-xl bg-blue-200/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </motion.div>
              
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-xl border transition-all duration-200 backdrop-blur-sm ${
                  showFilters 
                    ? 'bg-blue-50/80 border-blue-200 text-blue-600 shadow-inner' 
                    : 'bg-white/50 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <Filter className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          
          {/* Filters Section */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-blue-100/50 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">Filters</h3>
                      <span className="text-sm px-2 py-0.5 rounded-full bg-blue-100/50 text-blue-700">
                        {Object.values(selectedFilters).flat().length} selected
                      </span>
                    </div>
                    {hasActiveFilters && (
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center hover:bg-blue-50/50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Clear all <X className="w-3 h-3 ml-1" />
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'Status', options: statusOptions, type: 'status', icon: Calendar },
                      { title: 'Category', options: categoryOptions, type: 'category', icon: Building },
                      { title: 'Launch Year', options: yearOptions, type: 'year', icon: CreditCard }
                    ].map((filter) => (
                      <div key={filter.type} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <filter.icon className="w-4 h-4 text-gray-500" />
                          <p className="text-sm font-medium text-gray-700">{filter.title}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {filter.options.map(option => (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              key={option}
                              onClick={() => handleFilterToggle(filter.type, option)}
                              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                                selectedFilters[filter.type].includes(option)
                                  ? 'bg-blue-100/70 text-blue-800 border border-blue-200 shadow-inner backdrop-blur-sm'
                                  : 'bg-white/50 border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 backdrop-blur-sm'
                              }`}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {loading ? (
          <LoadingSkeleton />
        ) : schemes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-xl border border-blue-100/50 relative">
              <div className="absolute inset-0 rounded-full bg-blue-100/30 animate-pulse"></div>
              <Info className="w-12 h-12 text-blue-400 relative z-10" />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-3">No schemes found</h3>
            <p className="text-gray-500 max-w-md mx-auto">Try adjusting your search criteria or filters to find relevant schemes</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {schemes.map((scheme, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                key={index}
                onClick={() => generateSchemeDetails(scheme)}
                onMouseEnter={() => setHoveredScheme(index)}
                onMouseLeave={() => setHoveredScheme(null)}
                className="group relative bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-blue-100/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-100/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                <div className="p-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {scheme.name}
                    </h3>
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-md opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                      <Award className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2 group-hover:scale-125 transition-transform relative z-10" />
                    </div>
                  </div>
                  
                  {scheme.status && (
                    <div className="mb-3">
                      <span className={`text-xs px-3 py-1.5 rounded-lg font-medium backdrop-blur-sm shadow-sm ${getStatusColor(scheme.status)}`}>
                        {scheme.status}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scheme.description}</p>
                  
                  <div className="space-y-2.5 text-sm">
                    {scheme.state && (
                      <motion.div 
                        animate={hoveredScheme === index ? { x: 4 } : { x: 0 }}
                        className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{scheme.state}</span>
                      </motion.div>
                    )}
                    {scheme.ministry && (
                      <motion.div 
                        animate={hoveredScheme === index ? { x: 4 } : { x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors"
                      >
                        <Building className="w-4 h-4 mr-2" />
                        <span className="line-clamp-1">{scheme.ministry}</span>
                      </motion.div>
                    )}
                    {scheme.budget && (
                      <motion.div 
                        animate={hoveredScheme === index ? { x: 4 } : { x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center text-green-600 group-hover:text-green-700 transition-colors"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        <span>{scheme.budget}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Add CSS animations
const styleTag = typeof document !== 'undefined' ? document.createElement('style') : null;
if (styleTag) {
  styleTag.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .animate-fadeIn {
      animation: fadeIn 1s ease-out;
    }
    
    .animate-slideUp {
      animation: slideUp 0.8s ease-out;
    }
    
    .animate-pulse-slow {
      animation: pulse 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(styleTag);
}

export default SchemesPage;