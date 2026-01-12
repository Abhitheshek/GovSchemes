"use client"

import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import MainPage from './MainPage';
import SchemesPage from './SchemesPage';
import DetailsPage from './DetailsPage';
import { callGeminiAPI, getSchemePrompts, getSchemeDetailsPrompt } from './api';
import { getMockSchemes, getMockDetails } from './mockData';
import { handleError, parseJsonResponse } from './utils';
import { Loader2 } from 'lucide-react';
import SchemaCategories from '../components/SchemaCard';
import './styles.css';
import { useSearchParams } from 'next/navigation';

const IndianGovSchemesPortal = () => {
    const [currentView, setCurrentView] = useState('main');
    const [schemes, setSchemes] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        status: [],
        category: [],
        year: []
    });
    const [currentCategory, setCurrentCategory] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if category parameter exists and auto-generate schemes
        const category = searchParams.get('category');
        if (category && getSchemePrompts[category]) {
            generateSchemes(category);
        }
    }, [searchParams]);

    useEffect(() => {
        // Reset search and filters when changing views
        if (currentView === 'main') {
            setSearchQuery('');
            setSelectedFilters({
                status: [],
                category: [],
                year: []
            });
        }
    }, [currentView]);

    const generateSchemes = async (category) => {
        try {
            setLoading(true);
            setCurrentCategory(category);

            const response = await callGeminiAPI(getSchemePrompts[category]);
            const parsedSchemes = response ? parseJsonResponse(response) : null;

            if (parsedSchemes) {
                setSchemes(parsedSchemes);
                toast.success(`${parsedSchemes.length} schemes loaded successfully`);
            } else {
                setSchemes(getMockSchemes(category));
                toast.error('Could not load data from API, showing sample schemes');
            }
        } catch (error) {
            handleError(error);
            setSchemes(getMockSchemes(category));
        } finally {
            setLoading(false);
            setCurrentView('schemes');
        }
    };

    const generateSchemeDetails = async (scheme) => {
        try {
            setLoading(true);

            const response = await callGeminiAPI(getSchemeDetailsPrompt(scheme.name));
            const parsedDetails = response ? parseJsonResponse(response) : null;

            if (parsedDetails) {
                setSelectedScheme({ ...scheme, details: parsedDetails });
                toast.success('Scheme details loaded successfully');
            } else {
                setSelectedScheme({ ...scheme, details: getMockDetails() });
                toast.error('Could not load details from API, showing sample data');
            }
        } catch (error) {
            handleError(error);
            setSelectedScheme({ ...scheme, details: getMockDetails() });
        } finally {
            setLoading(false);
            setCurrentView('details');
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (filterType, values) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: values
        }));
    };

    const filteredSchemes = schemes.filter(scheme => {
        const matchesSearch = searchQuery ?
            scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        const matchesStatus = selectedFilters.status.length === 0 ||
            (scheme.status && selectedFilters.status.includes(scheme.status));

        const matchesCategory = selectedFilters.category.length === 0 ||
            (scheme.category && selectedFilters.category.includes(scheme.category));

        const matchesYear = selectedFilters.year.length === 0 ||
            (scheme.launchYear && selectedFilters.year.includes(scheme.launchYear));

        return matchesSearch && matchesStatus && matchesCategory && matchesYear;
    });

    return (
        <>
            <Toaster position="top-right" />
            <div className="font-sans min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative">
                {/* Full-page loading overlay */}
                {loading && (
                    <div className="fixed inset-0 bg-blue-700/90 backdrop-blur-md z-50 flex items-center justify-center transition-all duration-300 ease-in-out">
                        <div className="text-center text-white relative">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping"></div>
                                <Loader2 className="w-24 h-24 animate-spin mx-auto mb-6 drop-shadow-lg relative z-10" />
                            </div>
                            <h3 className="text-3xl font-bold mt-4 animate-pulse">
                                {currentView === 'schemes' ? `Loading ${currentCategory} schemes...` : 
                                 currentView === 'details' ? `Loading scheme details...` : 'Loading...'}
                            </h3>
                            <p className="mt-3 text-blue-100 max-w-md">Please wait while we prepare your data</p>
                            <div className="mt-6 w-64 h-2 bg-blue-300/30 rounded-full mx-auto overflow-hidden">
                                <div className="h-full bg-white rounded-full animate-[loadingBar_2s_ease-in-out_infinite]"></div>
                            </div>
                        </div>
                    </div>
                )}
                
                {currentView === 'main' && ( 
                    <MainPage generateSchemes={generateSchemes} />
                )}

                {currentView === 'schemes' && (
                    <SchemesPage
                        schemes={filteredSchemes}
                        loading={false} 
                        setCurrentView={setCurrentView}
                        generateSchemeDetails={generateSchemeDetails}
                        searchQuery={searchQuery}
                        onSearch={handleSearch}
                        selectedFilters={selectedFilters}
                        onFilterChange={handleFilterChange}
                        categoryTitle={currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
                    />
                )}
                {currentView === 'details' && (
                    <DetailsPage
                        selectedScheme={selectedScheme}
                        loading={false} 
                        setCurrentView={setCurrentView}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                )}
            </div>
            
            {/* Add CSS animations */}
            <style jsx>{`
                @keyframes loadingBar {
                    0% { width: 0%; }
                    50% { width: 100%; }
                    100% { width: 0%; }
                }
            `}</style>
        </>
    );
};

export default IndianGovSchemesPortal;