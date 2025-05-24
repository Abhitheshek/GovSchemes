"use client"

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Indian Government Schemes Portal</h3>
            <p className="text-blue-100 mb-4">
              Your comprehensive resource for government schemes, scholarships, and welfare programs designed for Indian citizens.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/schema" className="text-blue-100 hover:text-white transition-colors">
                  All Schemes
                </Link>
              </li>
              <li>
                <Link href="/schema-finder" className="text-blue-100 hover:text-white transition-colors">
                  Scheme Finder
                </Link>
              </li>
              <li>
                <Link href="/national" className="text-blue-100 hover:text-white transition-colors">
                  National Schemes
                </Link>
              </li>
              <li>
                <Link href="/state" className="text-blue-100 hover:text-white transition-colors">
                  State Schemes
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/schema/education" className="text-blue-100 hover:text-white transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/schema/healthcare" className="text-blue-100 hover:text-white transition-colors">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="/schema/agriculture" className="text-blue-100 hover:text-white transition-colors">
                  Agriculture
                </Link>
              </li>
              <li>
                <Link href="/schema/employment" className="text-blue-100 hover:text-white transition-colors">
                  Employment
                </Link>
              </li>
              <li>
                <Link href="/schema/housing" className="text-blue-100 hover:text-white transition-colors">
                  Housing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-blue-300" />
                <span className="text-blue-100">
                  Ministry of Electronics & IT, Electronics Niketan, New Delhi - 110003
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-300" />
                <span className="text-blue-100">1800-11-4455</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-300" />
                <span className="text-blue-100">support@govschemes.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm mb-4 md:mb-0">
            © {currentYear} Indian Government Schemes Portal. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-blue-100 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-blue-100 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-blue-100 hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;