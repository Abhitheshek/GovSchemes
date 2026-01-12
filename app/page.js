"use client"
import React from 'react'
import Hero from './components/hero'
import Navbar from './components/navbar'
import SchemaCategories from './components/SchemaCard'
import PopularSchema from './components/popularSchema'
import StepsSection from './components/StepsSection'
import Footer from './components/Footer'
import FAQ from './components/FAQ'
import GlobalChatButton from './chatbot/GlobalChatButton'
import FinalChatbot from './finalChatbot'

import { useState, useEffect } from 'react';
import LoadingAnimation from './components/LoadingAnimation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  // useEffect(() => {
  //   // Simulate content loading
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // const handleLoadingComplete = () => {
  //   setContentLoaded(true);
  //   document.body.style.overflow = 'auto'; // Enable scrolling after loading
  // };

  // Prevent scrolling during loading
  // useEffect(() => {
  //   if (isLoading) {
  //     document.body.style.overflow = 'hidden';
  //   }
  // }, [isLoading]);

  return (
    <main>
      <div>
        <Navbar />
        <Hero />
        <SchemaCategories/>
        <PopularSchema/>
        <StepsSection />
        <FAQ/>
        <Footer/>
        <FinalChatbot/>
      </div>
    </main>
  );
}