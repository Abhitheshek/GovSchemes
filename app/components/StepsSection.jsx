"use client";
import React from 'react';

export default function StepsSection() {
  const steps = [
    {
      id: 1,
      title: "Check Eligibility",
      description: "Verify if you meet the criteria for the scheme you're interested in",
      color: "blue"
    },
    {
      id: 2,
      title: "Prepare Documents",
      description: "Gather all required documents as mentioned in the scheme guidelines",
      color: "green"
    },
    {
      id: 3,
      title: "Apply Online",
      description: "Submit your application through the official portal or nearest CSC center",
      color: "yellow"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-white"></div>
      <div className="absolute inset-0 -z-10 bg-[url('/circuit-pattern.png')] opacity-5 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
            How to Apply
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Follow these simple steps to apply for any government scheme
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`group relative bg-${step.color}-100 rounded-2xl border-${step.color}-500 border shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            >
              <div className="p-8">
                <div className={`w-16 h-16 bg-${step.color}-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {step.id}
                </div>
                <h3 className={`text-xl font-bold mb-3 text-${step.color}-600 text-center`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
              <div className={`h-1 w-full bg-${step.color}-500 absolute bottom-0`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}