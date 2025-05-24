import React from 'react';
import { Search, HelpCircle, Info, Flag } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-3 shadow-md">
              <Search className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Government Scheme Finder</h1>
              <p className="text-blue-100">Discover schemes tailored to your needs</p>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="hidden md:flex items-center space-x-4">
           <Link href="/">  
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 hover:cursor-pointer py-2 rounded-lg transition-colors">
              <Flag className="h-5 w-5" />
              <span>Home</span>
            </button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden bg-white/20 p-2 rounded-lg text-white hover:bg-white/30 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="h-6 overflow-hidden">
        <svg className="h-full w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="#ffffff" 
            opacity="0.1"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            fill="#ffffff" 
            opacity="0.1"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Header;