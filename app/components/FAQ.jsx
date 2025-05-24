"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I find schemes relevant to me?",
      answer: "You can browse schemes by category from our homepage or use the search function to find specific schemes. You can also filter schemes based on eligibility criteria such as age, income, gender, and more."
    },
    {
      question: "How do I apply for a government scheme?",
      answer: "Each scheme has its own application process. Once you select a scheme, you'll find detailed instructions on the eligibility criteria, required documents, and application procedure. Many schemes offer online application options through their official portals."
    },
    {
      question: "Are all schemes available in all states?",
      answer: "No, some schemes are national while others are specific to certain states or union territories. Our portal clearly indicates the geographical coverage of each scheme to help you identify which ones are available in your region."
    },
    {
      question: "How often is the information updated?",
      answer: "We strive to keep all information up-to-date with the latest government announcements. Scheme details are regularly reviewed and updated to reflect any changes in eligibility criteria, benefits, or application processes."
    },
    {
      question: "Can I get assistance with my application?",
      answer: "Yes, many schemes have helpline numbers or support centers to assist with applications. These contact details are provided on the respective scheme pages. Additionally, you can reach out to your local government offices for in-person assistance."
    }
  ];

  return (
    <div id='faq' className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-2 px-4 bg-blue-100 rounded-full text-blue-700 font-medium text-sm mb-4">
            Common Questions
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about government schemes and how to use our portal
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg text-gray-800">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              <div 
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;