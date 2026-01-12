"use client"

import React, { useState } from 'react';
import { 
  ArrowLeft, Award, Users, CreditCard, MapPin, FileText, 
  Target, CheckCircle, Phone, Globe, Calendar, HelpCircle, 
  Download, Share2, Play, Star, ChevronRight, ExternalLink, 
  BarChart, Percent, Clock, Mail, MessageCircle
} from 'lucide-react';
import { formatDate, formatCurrency } from './utils';

const SchemeHeader = ({ scheme, onBack, onShowVideo }) => (
  <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
    {scheme.bannerImage && (
      <div className="absolute inset-0">
        <img 
          src={scheme.bannerImage} 
          alt={scheme.name}
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-600" />
      </div>
    )}
    
    <div className="relative container mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="flex items-center p-2 bg-amber-50  text-black/80 cursor-pointer rounded-3xl hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Schemes
      </button>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold">{scheme.name}</h1>
            {scheme.status && (
              <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                {scheme.status}
              </span>
            )}
          </div>
          
          <p className="text-lg text-white/90 mb-6 max-w-3xl leading-relaxed">
            {scheme.description}
          </p>

          <div className="flex flex-wrap gap-4">
            {scheme.highlights?.map((highlight, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-lg px-4 py-3">
                <p className="text-white/60 text-sm mb-1">{highlight.title}</p>
                <p className="font-semibold text-lg">{highlight.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          {scheme.videoUrl && (
            <button 
              onClick={onShowVideo}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium w-full"
            >
              <Play className="w-5 h-5" />
              Watch Video
            </button>
          )}
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-white w-full">
            <Download className="w-5 h-5" />
            Download PDF
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-white w-full">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, title, value, color = "blue" }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
      </div>
      <Icon className={`w-8 h-8 text-${color}-500`} />
    </div>
  </div>
);

const TabOverview = ({ scheme }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">About the Scheme</h3>
      <p className="text-gray-600 leading-relaxed">
        {scheme.details?.overview?.description}
      </p>
    </div>

    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Objectives</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scheme.details?.objectives?.map((objective, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start gap-3">
              {objective.icon === 'target' && <Target className="w-5 h-5 text-blue-500 mt-1" />}
              {objective.icon === 'chart' && <BarChart className="w-5 h-5 text-blue-500 mt-1" />}
              {objective.icon === 'users' && <Users className="w-5 h-5 text-blue-500 mt-1" />}
              <div>
                <h5 className="font-medium text-gray-800 mb-1">{objective.title}</h5>
                <p className="text-sm text-gray-600">{objective.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TabEligibility = ({ scheme }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Eligibility Criteria</h3>
      <div className="space-y-4">
        {scheme.details?.eligibility?.criteria?.map((criterion, index) => (
          <div 
            key={index}
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h5 className="font-medium text-gray-800 mb-1">{criterion.title}</h5>
                <p className="text-sm text-gray-600">{criterion.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Required Documents</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scheme.details?.eligibility?.requiredDocuments?.map((doc, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h5 className="font-medium text-gray-800 mb-1">{doc.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                  {doc.format}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TabProcess = ({ scheme }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Application Process</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <div className="space-y-6">
          {scheme.details?.process?.applicationSteps?.map((step, index) => (
            <div key={index} className="relative flex items-start gap-6 pl-8">
              <div className="absolute left-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {step.step}
              </div>
              <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4">
                <h5 className="font-medium text-gray-800 mb-2">{step.title}</h5>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {scheme.details?.process?.onlinePortal && (
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Online Application</h4>
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h5 className="font-medium text-gray-800">Application Portal</h5>
              <p className="text-sm text-gray-600">Apply online through the official portal</p>
            </div>
            <a
              href={scheme.details.process.onlinePortal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              Apply Now
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Supported Browsers: {scheme.details.process.onlinePortal.supportedBrowsers.join(', ')}</span>
            </div>
            {scheme.details.process.onlinePortal.mobileApp && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Mobile App Available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);

const TabBenefits = ({ scheme }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-800 mb-6">Benefits & Features</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {scheme.details?.benefits?.map((benefit, index) => (
        <div 
          key={index}
          className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-blue-100"
        >
          <div className="flex items-start gap-4">
            {benefit.icon === 'cash' && <CreditCard className="w-6 h-6 text-green-500" />}
            {benefit.icon === 'percentage' && <Percent className="w-6 h-6 text-blue-500" />}
            {benefit.icon === 'shield' && <Award className="w-6 h-6 text-purple-500" />}
            {benefit.icon === 'star' && <Award className="w-6 h-6 text-yellow-500" />}
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">{benefit.title}</h4>
              <p className="text-gray-600 mb-3">{benefit.description}</p>
              {benefit.value && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {benefit.value}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TabStatistics = ({ scheme }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Implementation Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scheme.details?.statistics?.yearlyData?.map((data, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium text-gray-800">Year {data.year}</h5>
              <span className="text-sm text-green-600">
                +{data.growth} Growth
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Beneficiaries</span>
                <span className="font-medium">{data.beneficiaries}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Disbursement</span>
                <span className="font-medium">{data.disbursement}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-4">State-wise Implementation</h4>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-gray-50">
          <div className="font-medium text-gray-700">State</div>
          <div className="font-medium text-gray-700">Beneficiaries</div>
          <div className="font-medium text-gray-700">Disbursement</div>
          <div className="font-medium text-gray-700">Implementation</div>
        </div>
        <div className="divide-y divide-gray-200">
          {scheme.details?.statistics?.stateWiseData?.map((state, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4">
              <div className="text-gray-800">{state.state}</div>
              <div className="text-gray-600">{state.beneficiaries}</div>
              <div className="text-gray-600">{state.disbursement}</div>
              <div className="text-gray-600">{state.implementation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TabResources = ({ scheme }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Guidelines & Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scheme.details?.resources?.guidelines?.map((doc, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-500 mt-1" />
              <div className="flex-1">
                <h5 className="font-medium text-gray-800 mb-1">{doc.title}</h5>
                <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{doc.format} • {doc.size}</span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    Download
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Success Stories</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scheme.details?.resources?.successStories?.map((story, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            {story.imageUrl && (
              <img 
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h5 className="font-medium text-gray-800 mb-2">{story.title}</h5>
              <p className="text-sm text-gray-600 mb-3">{story.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{story.location}</span>
                <span className="text-green-600">{story.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DetailsPage = ({ selectedScheme, loading, setCurrentView, activeTab, setActiveTab }) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!selectedScheme) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'eligibility', label: 'Eligibility', icon: CheckCircle },
    { id: 'process', label: 'How to Apply', icon: Target },
    { id: 'benefits', label: 'Benefits', icon: Award },
    { id: 'statistics', label: 'Statistics', icon: BarChart },
    { id: 'resources', label: 'Resources', icon: FileText }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TabOverview scheme={selectedScheme} />;
      case 'eligibility':
        return <TabEligibility scheme={selectedScheme} />;
      case 'process':
        return <TabProcess scheme={selectedScheme} />;
      case 'benefits':
        return <TabBenefits scheme={selectedScheme} />;
      case 'statistics':
        return <TabStatistics scheme={selectedScheme} />;
      case 'resources':
        return <TabResources scheme={selectedScheme} />;
      default:
        return <TabOverview scheme={selectedScheme} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SchemeHeader 
        scheme={selectedScheme} 
        onBack={() => setCurrentView('schemes')}
        onShowVideo={() => setShowVideo(true)}
      />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Quick Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Application Timeline */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {formatDate(selectedScheme.details?.process?.timeline?.applicationStart)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">
                        {formatDate(selectedScheme.details?.process?.timeline?.applicationEnd)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Processing Time</p>
                      <p className="font-medium">
                        {selectedScheme.details?.process?.timeline?.processingTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Total Beneficiaries</p>
                      <p className="font-medium">
                        {selectedScheme.details?.statistics?.overview?.totalBeneficiaries}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Total Disbursement</p>
                      <p className="font-medium">
                        {selectedScheme.details?.statistics?.overview?.totalDisbursement}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Percent className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Success Rate</p>
                      <p className="font-medium">
                        {selectedScheme.details?.statistics?.overview?.successRate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Helpline</p>
                      <p className="font-medium">
                        {selectedScheme.details?.support?.helpline?.number}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedScheme.details?.support?.helpline?.hours}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Email Support</p>
                      <a 
                        href={`mailto:${selectedScheme.details?.support?.onlineSupport?.email}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {selectedScheme.details?.support?.onlineSupport?.email}
                      </a>
                    </div>
                  </div>
                  {selectedScheme.details?.support?.onlineSupport?.chatbot && (
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-purple-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Chat Support</p>
                        <a 
                          href={selectedScheme.details?.support?.onlineSupport?.chatbot}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Open Chatbot
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto">
                    {tabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                            activeTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <IconComponent className="w-4 h-4 mr-2" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {showVideo && selectedScheme.details?.overview?.videoUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scheme Overview Video</h3>
              <button 
                onClick={() => setShowVideo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={selectedScheme.details.overview.videoUrl}
                title="Scheme Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;