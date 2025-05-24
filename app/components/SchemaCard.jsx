"use client";
import { useState } from 'react';
import Image from 'next/image';
import { mainCards } from '../schema/mainCards';
import { useRouter } from 'next/navigation';

export default function SchemaCategories() {
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();

  
  
  const schemas = {
    all: [
      {
        id: 1,
        name: "State Schemes",
        category: "State Level",
        image: "/kishan.jpg",
        color:"bg-blue-100",
        bgcolor: "bg-blue-500",
        borderColor: "border-blue-500",
        secondarycolor: "bg-blue-200",
        textcolor: "text-blue-500",
        description: "Explore various welfare schemes and programs implemented at the state level for citizens' benefit.",
        highlights: "State Benefits",
        stats: {
          schemes: "500+",
          departments: "20+",
          beneficiaries: "Millions"
        }
      },
      {
        id: 2,
        name: "National Schemes",
        category: "National Level",
        image: "/education.jpg",
        textcolor: "text-green-500",
        bgcolor: "bg-green-500",
        secondarycolor: "bg-green-200",
        borderColor: "border-green-500",
        
        color:"bg-green-100",
        description: "Discover nationwide government initiatives and programs designed for the development of all citizens.",
        highlights: "National Programs",
        stats: {
          schemes: "1000+",
          coverage: " India",
          sectors: "30+"
        }
      },
      {
        id: 3,
        name: "Scholarships",
        category: "Education",
        color:"bg-yellow-100",
        bgcolor: "bg-yellow-500",
        textcolor: "text-yellow-500",
        borderColor: "border-yellow-500",
        secondarycolor: "bg-yellow-200",
        image: "/scholarship2.jpg",
        description: "Find educational scholarships and financial support programs for students at various academic levels.",
        highlights: "Education Support",
        stats: {
          scholarships: "200+",
          categories: "15+",
          institutions: "1000+"
        }
      },
      {
        id: 4,
        name: "Financial Aids",
        category: "Financial Support",
        image: "/scholarship4.jpg",
        color:"bg-red-100",
        bgcolor: "bg-red-500",
        borderColor: "border-red-500",
        textcolor: "text-red-500",
        secondarycolor: "bg-red-200",
        description: "Access various financial assistance programs and subsidies offered by the government and more.",
        highlights: "Financial Support",
        stats: {
          programs: "300+",
          sectors: "25+",
          types: "50+"
        }
      }
    ],
  };

  return (
    <section id="categories" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-white"></div>
      <div className="absolute inset-0 -z-10 bg-[url('/circuit-pattern.png')] opacity-5 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-blue-500">
            Government Schemes
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-black">Explore various government schemes and programs designed for citizen welfare.</p>
        </div>
        
        {/* Schema Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 hover:cursor-pointer gap-8">
          {schemas[activeTab].map((schema) => (
            <div key={schema.id}
            
            onClick={() => router.push(`/schema#categories`)}
             className="group relative">
              
              <div className ={`relative flex flex-col md:flex-row ${schema.color} rounded-2xl ${schema.borderColor} border-1 shadow-2xl overflow-hidden`}>
                <div className="md:w-2/5 relative h-80 md:h-auto overflow-hidden">
                  <Image 
                    src={schema.image} 
                    alt={schema.name} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>
                
                <div className="md:w-3/5 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/50">
                  <div>
                    <h3 className={`text-2xl font-bold mb-1  ${schema.textcolor}`}> 
                      {schema.name}
                    </h3>
                    <p className="text-sm text-transparent bg-clip-text bg-gray-400 font-medium mb-4">
                      {schema.category}
                    </p>
                    <p className="text-black mb-4">{schema.description}</p>
                    <div className={`inline-block px-4 py-1.5 rounded-full ${schema.bgcolor} backdrop-blur-sm text-xs font-medium text-white mb-6 border border-indigo-500/20`}>
                      {schema.highlights}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(schema.stats).map(([key, value]) => (
                      <div key={key} className={`text-center p-2 rounded-lg ${schema.secondarycolor} backdrop-blur-lg`}>
                        <div className="text-lg font-bold text-black">
                          {value}
                        </div>
                        <div className="text-xs text-black capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}