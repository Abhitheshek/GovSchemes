"use client"

import React from 'react';
import { ChevronRight, ArrowDown, ChevronLeft } from 'lucide-react';
import { mainCards } from './mainCards';
import Link from 'next/link';

const MainPage = ({ generateSchemes }) => {
  const handleCardClick = (cardId) => {
    generateSchemes(cardId);
  };
  
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl"></div>
    </div>
    
    <div className="container mx-auto px-4 py-12 relative z-10">
      <div>
        <Link href="/">
        <button className="flex items-center rounded-2xl bg-blue-500 px-3 py-2 text-white hover:text-blue-600 hover:cursor-pointer transition-colors duration-300 mb-8"
         
        >
          <ChevronLeft className="inline w-4 h-4 mr-1" />
          <span className="text-white font-medium">Home</span>
        </button>
        </Link>
      </div>
      {/* Hero Section */}
      <div className="text-center mb-20 pt-8">
        <div className="inline-block p-2 px-6 bg-blue-600/10 border border-blue-200 rounded-full text-blue-700 font-medium text-sm mb-6 backdrop-blur-sm animate-fadeIn">
          Discover Government Schemes
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 leading-tight animate-slideUp">
          Indian Government <span className="text-blue-600 relative">
            Schemes Portal
            <span className="absolute bottom-1 left-0 w-full h-1 bg-blue-400/30 rounded-full"></span>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fadeIn">
          Discover and explore various government schemes, scholarships, and financial aid programs 
          designed for the welfare of Indian citizens
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
          <button 
            onClick={() => handleCardClick('national')}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium flex items-center justify-center shadow-lg hover:shadow-blue-300/50 group"
          >
            Explore Schemes <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#categories" className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center justify-center shadow-md hover:shadow-lg">
            View Categories <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { label: "Schemes", value: "1,000+" },
            { label: "States & UTs", value: "36" },
            { label: "Ministries", value: "50+" },
            { label: "Beneficiaries", value: "80+ Cr" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-blue-50 hover:border-blue-100 transform hover:-translate-y-1"
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-gray-500 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div id="categories" className="pt-12 pb-20 relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
            Categories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a category to explore relevant government schemes and programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {mainCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-100 "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-50">
                  <div className={`h-36 bg-gradient-to-r ${card.color} flex items-center justify-center relative overflow-hidden group-hover:h-40 transition-all duration-300`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent_70%)]"></div>
                    <IconComponent className="w-20 h-20 text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
                    <p className="text-gray-600 mb-5 text-sm leading-relaxed">{card.description}</p>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="font-medium">Explore Schemes</span>
                      <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Footer banner */}
      <div className="bg-blue-600 rounded-2xl mx-4 md:mx-8 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.8),transparent_70%)]"></div>
        <div className="px-6 py-12 md:py-16 text-center relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to find the perfect scheme?</h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Explore all available government schemes tailored to your needs
          </p>
          <button 
            onClick={() => handleCardClick('all')}
            className="px-8 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium shadow-lg"
          >
            View All Schemes
          </button>
        </div>
      </div>
    </div>
    
    {/* Add CSS animations */}
    <style jsx global>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .animate-fadeIn {
        animation: fadeIn 1s ease-out;
      }
      
      .animate-slideUp {
        animation: slideUp 0.8s ease-out;
      }
    `}</style>
  </div>
);
}

export default MainPage;