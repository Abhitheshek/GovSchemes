"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, Search } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = ['home', 'categories', 'schemes', 'about', 'faq'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'schemes', label: 'Schemes' },
    { id: 'about', label: 'About Us' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollPosition > 50 
          ? 'py-2 bg-white/90 backdrop-blur-md shadow-md border-b border-blue-100/50' 
          : 'py-4 bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
          <div>
            <Image src="/lionsymbol.png" alt="Logo" width={35} height={35} />
          </div>
            <div className="relative">
              <span 
                className="text-2xl font-bold"
              >
                <span className="text-blue-600">Gov</span>
                <span className="text-gray-800">Schemes</span>
                <span className="absolute -top-1 -right-2 w-2 h-2 bg-blue-600 rounded-full"></span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                href={`#${item.id}`} 
                className={`relative px-4 py-2 font-medium transition-all duration-200 rounded-lg ${
                  activeSection === item.id 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
            
            {/* Search button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="ml-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Login button */}
            <Link 
              href="/login" 
              className="ml-4 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              Login
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-blue-600" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-blue-400 shadow-lg border-t border-gray-200 p-4 animate-fadeDown">
          <div className="container mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for schemes..."
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5 text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-blue-600 z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-20 bg-white">
          <div className="flex flex-col space-y-4 ">
            {navItems.map((item, index) => (
              <Link 
                key={item.id}
                href={`#${item.id}`} 
                className={`py-3 px-4 text-lg font-medium rounded-lg transition-all duration-200  ${
                  activeSection === item.id 
                    ? 'text-white bg-blue-500' 
                    : 'text-black hover:bg-blue-700/70'
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  transitionDelay: `${index * 0.05}s`
                }}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-blue-500/30">
             
              
              <Link 
                href="/login" 
                className="block w-full text-center px-5 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-50 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
          
          {/* Government emblem */}
         
          
          {/* Close button */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-50"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeDown {
          animation: fadeDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}