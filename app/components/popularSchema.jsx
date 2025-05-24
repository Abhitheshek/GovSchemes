"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, Users, Calendar, Award, Target, FileText, CheckCircle, Clock, X } from 'lucide-react';

export default function PopularSchema({}) {
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const sectionRef = useRef(null);

    const popularSchemas = [
        {
          id: 1,
          name: "National Means-cum-Merit Scholarship",
          category: "Education",
          image: "/scholarship1.jpg",
          description: "Scholarship for meritorious students from economically weaker sections",
          beneficiaries: "10 Lakh+",
          deadline: "October 31, 2025",
          details: {
            overview: "The National Means-cum-Merit Scholarship Scheme (NMMSS) is a Central Sector Scheme launched in 2008 to award scholarships to meritorious students from economically weaker sections to arrest their drop out at class VIII and encourage them to continue their education at secondary stage.",
            eligibility: "Students studying in Class VIII in government, government-aided, and local body schools whose parental income does not exceed ₹3,50,000 per annum and who have secured at least 55% marks in Class VII annual examination.",
            amount: "₹12,000 per annum (₹1,000 per month)",
            applicationProcess: "Students need to appear for the State Level Means-cum-Merit Scholarship Examination conducted by their respective State/UT. The scholarship is awarded to students based on their performance in this examination.",
            documents: ["Aadhar Card", "Income Certificate", "Bank Account Details", "School ID Card", "Mark Sheet of Class VII"],
            benefits: ["Financial assistance for education", "Recognition of academic merit", "Encouragement to continue studies", "Reduction in dropout rates"],
            timeline: {
              applicationStart: "August 1, 2025",
              applicationEnd: "October 31, 2025",
              examDate: "December 2025",
              resultDeclaration: "February 2026",
              disbursement: "Quarterly basis through Direct Benefit Transfer"
            },
            statistics: {
              totalBeneficiaries: "10 Lakh+ students annually",
              totalDisbursement: "₹1,200 Crore annually",
              successRate: "85% retention rate in higher education",
              stateWiseDistribution: "All states and UTs with special focus on educationally backward regions"
            },
            contactInfo: {
              website: "https://scholarships.gov.in",
              helpline: "1800-XXX-XXXX",
              email: "nmmss-support@gov.in"
            }
          }
        },
        {
          id: 2,
          name: "Post Matric Scholarship for SC/ST",
          category: "Education",
          image: "/scholarship2.jpg",
          description: "Financial assistance to SC/ST students for studies beyond Class 10",
          beneficiaries: "25 Lakh+",
          deadline: "December 15, 2025",
          details: {
            overview: "The Post Matric Scholarship for SC/ST students is a centrally sponsored scheme implemented by the Ministry of Social Justice and Empowerment to provide financial assistance to Scheduled Caste students studying at post-matriculation or post-secondary stage.",
            eligibility: "SC/ST students studying in post-matriculation or post-secondary courses with family income not exceeding ₹2.5 lakh per annum.",
            amount: "Covers tuition fees, maintenance allowance, study tour charges, thesis typing/printing charges, book allowance, etc.",
            applicationProcess: "Students need to apply online through the National Scholarship Portal or respective State portals. Applications are verified by institutions and then by district/state authorities.",
            documents: ["Caste Certificate", "Income Certificate", "Previous Year Marksheet", "Bank Account Details", "Institution Verification"],
            benefits: ["Complete coverage of course fees", "Monthly maintenance allowance", "Book grants and study material allowance", "Disability allowance for differently-abled scholars"],
            timeline: {
              applicationStart: "September 1, 2025",
              applicationEnd: "December 15, 2025",
              verification: "January-February 2026",
              disbursement: "March 2026 onwards"
            },
            statistics: {
              totalBeneficiaries: "25 Lakh+ students annually",
              totalDisbursement: "₹3,500 Crore annually",
              successRate: "78% completion rate of higher education",
              stateWiseDistribution: "All states and UTs with higher allocation to states with larger SC/ST population"
            },
            contactInfo: {
              website: "https://scholarships.gov.in",
              helpline: "1800-XXX-YYYY",
              email: "scst-scholarship@gov.in"
            }
          }
        },
        {
          id: 3,
          name: "Merit-cum-Means Scholarship for Professional Courses",
          category: "Education",
          image: "/scholarship3.jpg",
          description: "Scholarship for minority students pursuing technical and professional courses",
          beneficiaries: "5 Lakh+",
          deadline: "November 30, 2025",
          details: {
            overview: "The Merit-cum-Means Scholarship for Professional and Technical Courses is implemented by the Ministry of Minority Affairs to provide financial assistance to poor and meritorious students belonging to minority communities for pursuing professional and technical courses.",
            eligibility: "Students from minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, and Parsis) with family income not exceeding ₹2.5 lakh per annum, pursuing technical and professional courses.",
            amount: "Course fee up to ₹20,000 per annum and maintenance allowance of ₹10,000 per annum",
            applicationProcess: "Online application through National Scholarship Portal followed by institution and district/state level verification.",
            documents: ["Minority Community Certificate", "Income Certificate", "Previous Academic Records", "Admission Letter", "Fee Receipt"],
            benefits: ["Financial support for professional education", "Maintenance allowance", "Merit recognition", "Increased access to higher education"],
            timeline: {
              applicationStart: "August 15, 2025",
              applicationEnd: "November 30, 2025",
              verification: "December 2025 - January 2026",
              disbursement: "February 2026 onwards"
            },
            statistics: {
              totalBeneficiaries: "5 Lakh+ students annually",
              totalDisbursement: "₹1,500 Crore annually",
              successRate: "82% course completion rate",
              communityWiseDistribution: "Muslims (60%), Christians (15%), Sikhs (10%), Buddhists (8%), Jains (5%), Parsis (2%)"
            },
            contactInfo: {
              website: "https://scholarships.gov.in",
              helpline: "1800-XXX-ZZZZ",
              email: "minority-scholarship@gov.in"
            }
          }
        },
        {
          id: 4,
          name: "INSPIRE Scholarship",
          category: "Science & Research",
          image: "/scholarship4.jpg",
          description: "Scholarship for students pursuing natural and basic sciences",
          beneficiaries: "1 Lakh+",
          deadline: "October 15, 2025",
          details: {
            overview: "The Innovation in Science Pursuit for Inspired Research (INSPIRE) Scholarship is a flagship program of the Department of Science & Technology to attract talented students towards science. It aims to build the required human resource pool for strengthening R&D base in the country.",
            eligibility: "Students who are among the top 1% in Class XII board examinations and pursuing courses in natural and basic sciences at the B.Sc. or integrated M.Sc. level.",
            amount: "₹80,000 per annum (₹5,000 per month + ₹20,000 annual contingency grant)",
            applicationProcess: "Online application through the INSPIRE portal. Students can apply either through Scholar Track or Direct Track based on their eligibility criteria.",
            documents: ["Class XII Marksheet", "Admission Proof in Basic/Natural Science Course", "Bank Account Details", "Aadhar Card"],
            benefits: ["Substantial financial support", "Recognition of scientific talent", "Encouragement for research careers", "Annual contingency grant for projects"],
            timeline: {
              applicationStart: "July 1, 2025",
              applicationEnd: "October 15, 2025",
              verification: "November-December 2025",
              disbursement: "January 2026 onwards"
            },
            statistics: {
              totalBeneficiaries: "1 Lakh+ students annually",
              totalDisbursement: "₹800 Crore annually",
              successRate: "65% pursue higher research",
              stateWiseDistribution: "All states and UTs with focus on increasing participation from northeastern states"
            },
            contactInfo: {
              website: "https://online-inspire.gov.in",
              helpline: "1800-XXX-AAAA",
              email: "inspire-dst@gov.in"
            }
          }
        },
        {
          id: 5,
          name: "Central Sector Scheme of Scholarships for College and University Students",
          category: "Higher Education",
          image: "/scholarship5.jpg",
          description: "Scholarship for meritorious students from low-income families",
          beneficiaries: "80,000+ per year",
          deadline: "August 31, 2025",
          details: {
            overview: "The Central Sector Scheme of Scholarships for College and University Students is implemented by the Ministry of Education to provide financial assistance to meritorious students from low income families to meet a part of their day-to-day expenses while pursuing higher studies.",
            eligibility: "Students who are above 80th percentile in Class XII board examinations and pursuing regular courses with family income less than ₹4.5 lakh per annum.",
            amount: "₹10,000 per annum for first three years and ₹20,000 per annum for fourth and fifth year",
            applicationProcess: "Online application through National Scholarship Portal followed by institution verification and state/central level approval.",
            documents: ["Income Certificate", "Class XII Marksheet", "College/University ID Card", "Bank Account Details"],
            benefits: ["Financial support for higher education", "Merit recognition", "Reduced financial burden on families", "Encouragement for academic excellence"],
            timeline: {
              applicationStart: "June 1, 2025",
              applicationEnd: "August 31, 2025",
              verification: "September-October 2025",
              disbursement: "November 2025 onwards"
            },
            statistics: {
              totalBeneficiaries: "80,000+ students annually",
              totalDisbursement: "₹100 Crore annually",
              successRate: "90% course completion rate",
              genderDistribution: "55% male, 45% female beneficiaries"
            },
            contactInfo: {
              website: "https://scholarships.gov.in",
              helpline: "1800-XXX-BBBB",
              email: "central-scholarship@education.gov.in"
            }
          }
        },
        {
          id: 6,
          name: "AICTE Pragati & Saksham Scholarships",
          category: "Technical Education",
          image: "/scholarship6.jpg",
          description: "Scholarships for girls and differently-abled students in technical courses",
          beneficiaries: "10,000+ annually",
          deadline: "September 30, 2025",
          details: {
            overview: "AICTE Pragati Scholarship is for girl students and Saksham Scholarship is for differently-abled students pursuing technical education. These schemes aim to promote technical education among these specific groups and provide them with financial support.",
            eligibility: "For Pragati: Girl students admitted to AICTE approved technical institutions with family income less than ₹8 lakh per annum. For Saksham: Differently-abled students with 40% disability pursuing technical education.",
            amount: "₹50,000 per annum (tuition fee reimbursement up to ₹30,000 and ₹20,000 as incidental charges)",
            applicationProcess: "Online application through the AICTE portal followed by institution verification and AICTE approval.",
            documents: ["Income Certificate", "Disability Certificate (for Saksham)", "Previous Academic Records", "Institution Verification", "Bank Account Details"],
            benefits: ["Tuition fee reimbursement", "Incidental allowance", "Promotion of gender equality in technical education", "Support for differently-abled students"],
            timeline: {
              applicationStart: "July 15, 2025",
              applicationEnd: "September 30, 2025",
              verification: "October-November 2025",
              disbursement: "December 2025 onwards"
            },
            statistics: {
              totalBeneficiaries: "10,000+ students annually",
              totalDisbursement: "₹50 Crore annually",
              successRate: "85% course completion rate",
              institutionDistribution: "Coverage across 3,000+ AICTE approved institutions"
            },
            contactInfo: {
              website: "https://www.aicte-india.org",
              helpline: "1800-XXX-CCCC",
              email: "pragati-saksham@aicte-india.org"
            }
          }
        }
      ];
      
    const handleSchemeClick = (scheme) => {
      setSelectedScheme(scheme);
      setShowDetails(true);
      // Save current scroll position instead of scrolling to top
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const handleCloseDetails = () => {
      setShowDetails(false);
      setSelectedScheme(null);
      document.body.style.overflow = ''; // Re-enable scrolling
    };

    return (
      <section id="schemes" ref={sectionRef} className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 bg-gray-200"></div>
        <div className="absolute inset-0 -z-10 bg-[url('/circuit-pattern.png')] opacity-5 mix-blend-overlay"></div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-fuchsia-400/20 to-rose-400/20 blur-xl"></div>

        {/* Scheme Details Modal */}
        {showDetails && selectedScheme && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{selectedScheme.name}</h2>
                <button 
                  onClick={handleCloseDetails}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              {/* Hero Section */}
              <div className="relative h-64">
                <Image
                  src={selectedScheme.image}
                  alt={selectedScheme.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-500/80 text-white mb-3">
                    {selectedScheme.category}
                  </span>
                  <p className="text-gray-200 max-w-2xl">
                    {selectedScheme.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Key Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-blue-50 rounded-xl p-6 shadow-md">
                    <Users className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Beneficiaries</h3>
                    <p className="text-blue-700 font-medium">{selectedScheme.beneficiaries}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-6 shadow-md">
                    <Calendar className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Application Deadline</h3>
                    <p className="text-purple-700 font-medium">{selectedScheme.deadline}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 shadow-md">
                    <Award className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Scholarship Amount</h3>
                    <p className="text-green-700 font-medium">{selectedScheme.details.amount}</p>
                  </div>
                </div>

                {/* Overview */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-blue-600" />
                    Overview
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedScheme.details.overview}
                    </p>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                    Eligibility
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {selectedScheme.details.eligibility}
                    </p>
                    <h3 className="font-semibold text-gray-800 mb-2">Required Documents:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedScheme.details.documents.map((doc, index) => (
                        <li key={index} className="text-gray-700">{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Application Process */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-purple-600" />
                    Application Process
                  </h2>
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {selectedScheme.details.applicationProcess}
                    </p>
                    
                    <h3 className="font-semibold text-gray-800 mb-3">Timeline:</h3>
                    <div className="space-y-4">
                      {Object.entries(selectedScheme.details.timeline).map(([key, value], index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-purple-100 rounded-full p-2 mr-3">
                            <Calendar className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                            <p className="text-gray-600">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-yellow-600" />
                    Benefits
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedScheme.details.benefits.map((benefit, index) => (
                      <div key={index} className="bg-yellow-50 rounded-xl p-5 border border-yellow-100 shadow-md">
                        <p className="text-gray-800">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Statistics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(selectedScheme.details.statistics).map(([key, value], index) => (
                      <div key={index} className="bg-blue-50 rounded-xl p-5 border border-blue-100 shadow-md">
                        <h3 className="font-medium text-gray-800 mb-1">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                        <p className="text-blue-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-indigo-600" />
                    Contact Information
                  </h2>
                  <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="font-medium text-gray-800">Website</p>
                        <a href="#" className="text-indigo-600 hover:underline">{selectedScheme.details.contactInfo.website}</a>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Helpline</p>
                        <p className="text-indigo-600">{selectedScheme.details.contactInfo.helpline}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <a href="#" className="text-indigo-600 hover:underline">{selectedScheme.details.contactInfo.email}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-blue-500">
              Popular Schemes
            </h2>
            <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-black">
              Discover the most sought-after government schemes benefiting millions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularSchemas.map((schema) => (
              <div key={schema.id} className="group cursor-pointer border-1 border-blue-500 rounded-2xl" onClick={() => handleSchemeClick(schema)}>
                <div className="relative h-full">
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-0.5 bg-blue-200 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  
                  {/* Card Content */}
                  <div className="relative h-full  bg-white rounded-2xl overflow-hidden">
                    {/* Image Section */}
                    <div className="relative h-48">
                      <Image
                        src={schema.image}
                        alt={schema.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-white opacity-20"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500 backdrop-blur-sm border border-indigo-500/20 text-gray-300">
                          {schema.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 backdrop-blur-sm bg-white">
                      <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-blue-500">
                        {schema.name}
                      </h3>
                      <p className="text-black mb-4 text-sm">
                        {schema.description}
                      </p>

                      {/* Stats */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-fuchsia-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                          </svg>
                          <span className="text-sm text-black">{schema.beneficiaries}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                          </svg>
                          <span className="text-sm text-black">{schema.deadline}</span>
                        </div>
                      </div>
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