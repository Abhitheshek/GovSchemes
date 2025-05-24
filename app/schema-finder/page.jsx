'use client';

import React, { useState, useEffect } from 'react';
import { searchSchemesAPI, getSchemeDetailsAPI } from './api';
import { categories, states, beneficiaryTypes, levels, ageGroups, incomeRanges } from './constants';
import Header from './Header';
import FilterForm from './FilterForm';
import SchemeResults from './SchemeResults';
import SchemeDetail from './SchemeDetail';
import EmptyState from './EmptyState';
import { AlertCircle, X } from 'lucide-react';

export default function Page() {
  const [formData, setFormData] = useState({
    category: '',
    state: '',
    beneficiaryType: '',
    level: '',
    ageGroup: '',
    incomeRange: ''
  });
  
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  

  // Add animation classes
  useEffect(() => {
    // Add required CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const searchSchemes = async () => {
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    setLoading(true);
    setError('');
    setIsFilterExpanded(false);
    
    try {
      const schemesData = await searchSchemesAPI(formData, apiKey);
      setSchemes(schemesData);
      
      // Scroll to results
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('results-section')?.offsetTop - 100 || 0,
          behavior: 'smooth'
        });
      }, 100);
    } catch (err) {
      setError(err.message || 'Failed to fetch schemes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSchemeDetails = async (scheme) => {
    setLoading(true);
    
    try {
      const detailedInfo = await getSchemeDetailsAPI(scheme, apiKey);
      setSelectedScheme({ ...scheme, detailedInfo });
      
      // Scroll to top when viewing details
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to fetch scheme details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      category: '',
      state: '',
      beneficiaryType: '',
      level: '',
      ageGroup: '',
      incomeRange: ''
    });
    setSchemes([]);
  };

  // API Key modal
  const renderApiKeyModal = () => {
    if (!showApiKeyInput) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Enter API Key</h3>
            <button 
              onClick={() => setShowApiKeyInput(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Please enter your Gemini API key to use this application.
          </p>
          
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
          />
          
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowApiKeyInput(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowApiKeyInput(false);
                if (apiKey) searchSchemes();
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              disabled={!apiKey}
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (selectedScheme) {
    return (
      <>
        <SchemeDetail 
          scheme={selectedScheme}
          loading={loading}
          getSchemeDetails={getSchemeDetails}
          onBack={() => setSelectedScheme(null)}
        />
        {renderApiKeyModal()}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <FilterForm 
          formData={formData}
          handleInputChange={handleInputChange}
          searchSchemes={searchSchemes}
          resetForm={resetForm}
          loading={loading}
          categories={categories}
          states={states}
          beneficiaryTypes={beneficiaryTypes}
          levels={levels}
          ageGroups={ageGroups}
          incomeRanges={incomeRanges}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-start gap-3 shadow-sm animate-fadeIn">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">Error</h4>
              <p>{error}</p>
            </div>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Results Section */}
        <div id="results-section">
          {loading && (
            <div className="text-center py-16 animate-fadeIn">
              <div className="inline-block relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600 mt-4 text-lg">Searching for schemes...</p>
              <p className="text-gray-500 text-sm">This may take a few moments</p>
            </div>
          )}
          
          {!loading && schemes.length > 0 && (
            <SchemeResults 
              schemes={schemes} 
              getSchemeDetails={getSchemeDetails} 
            />
          )}
          
          {!loading && !error && schemes.length === 0 && (
            <EmptyState />
          )}
        </div>
      </div>
      
      {renderApiKeyModal()}
    </div>
  );
}