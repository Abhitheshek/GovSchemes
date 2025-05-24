import React, { useState } from 'react';
import { ArrowLeft, Share2, Bookmark, Download, Award, MapPin, Users, Calendar, Building, FileText, Printer, FileCheck, Clock, Wallet, Globe, AlertCircle } from 'lucide-react';
import SchemeDetailContent from './SchemeDetailContent';
import { getCategoryIcon, getCategoryColorScheme } from './utils';

const SchemeDetail = ({ scheme, loading, getSchemeDetails, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get color scheme based on category or color hint
  const colorScheme = getCategoryColorScheme(scheme.color || scheme.category);
  
  // Get the appropriate icon based on category
  const IconComponent = getCategoryIcon(scheme.category);

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'eligibility', label: 'Eligibility', icon: FileCheck },
    { id: 'benefits', label: 'Benefits', icon: Award },
    { id: 'application', label: 'How to Apply', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'budget', label: 'Budget', icon: Wallet },
    { id: 'contact', label: 'Contact', icon: Globe }
  ];
  
  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f5f3ff 100%)`
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Back button and action buttons */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <button
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#4f46e5',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                fontWeight: '500'
              }}
            >
              <ArrowLeft size={20} />
              <span>Back to Results</span>
            </button>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                color: '#4b5563'
              }}>
                <Share2 size={16} />
                <span style={{ display: 'none' }}>Share</span>
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                color: '#4b5563'
              }}>
                <Download size={16} />
                <span style={{ display: 'none' }}>Download</span>
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                color: '#4b5563'
              }}>
                <Printer size={16} />
                <span style={{ display: 'none' }}>Print</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          border: '1px solid #f3f4f6'
        }}>
          {/* Header with gradient background */}
          <div style={{
            background: `linear-gradient(to right, #4f46e5, #3b82f6)`,
            padding: '2rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '16rem',
              height: '16rem',
              backgroundColor: 'white',
              opacity: '0.05',
              borderRadius: '50%',
              transform: 'translate(50%, -50%)'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '8rem',
              height: '8rem',
              backgroundColor: 'white',
              opacity: '0.05',
              borderRadius: '50%',
              transform: 'translate(-50%, 50%)'
            }}></div>
            
            <div style={{ position: 'relative', zIndex: '10' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  borderRadius: '0.5rem', 
                  padding: '0.5rem',
                  backdropFilter: 'blur(4px)'
                }}>
                  <IconComponent size={24} color="white" />
                </div>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>{scheme.category}</span>
              </div>
              
              <h1 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                marginBottom: '0.75rem'
              }}>{scheme.name}</h1>
              
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                fontSize: '1.125rem', 
                maxWidth: '48rem'
              }}>{scheme.description}</p>
              
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '1rem', 
                marginTop: '2rem'
              }}>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(4px)', 
                  borderRadius: '0.75rem', 
                  padding: '0.75rem 1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem'
                }}>
                  <Building size={20} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', display: 'block' }}>Ministry</span>
                    <p style={{ fontWeight: '600' }}>{scheme.ministry}</p>
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(4px)', 
                  borderRadius: '0.75rem', 
                  padding: '0.75rem 1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem'
                }}>
                  <MapPin size={20} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', display: 'block' }}>Level</span>
                    <p style={{ fontWeight: '600' }}>{scheme.level}</p>
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(4px)', 
                  borderRadius: '0.75rem', 
                  padding: '0.75rem 1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem'
                }}>
                  <Calendar size={20} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', display: 'block' }}>Launch Year</span>
                    <p style={{ fontWeight: '600' }}>{scheme.launchYear}</p>
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(4px)', 
                  borderRadius: '0.75rem', 
                  padding: '0.75rem 1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem'
                }}>
                  <Users size={20} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  <div>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', display: 'block' }}>Beneficiary</span>
                    <p style={{ fontWeight: '600' }}>{scheme.beneficiary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modern pill-style tabs */}
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ 
              display: 'flex', 
              backgroundColor: '#f9fafb',
              padding: '0.25rem',
              borderRadius: '9999px',
              overflowX: 'auto',
              gap: '0.25rem',
              maxWidth: '100%',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
            }}>
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                    backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
                    color: activeTab === tab.id ? '#4f46e5' : '#6b7280',
                    boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Content area */}
          <div style={{ padding: '2rem' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div style={{ 
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  border: '4px solid #f3f4f6',
                  borderTopColor: '#4f46e5',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 1.5rem'
                }}></div>
                <p style={{ color: '#4b5563', fontSize: '1.125rem' }}>Loading detailed information...</p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>This may take a few moments</p>
                
                <style jsx>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            ) : scheme.detailedInfo ? (
              <SchemeDetailContent 
                detailedInfo={scheme.detailedInfo} 
                activeTab={activeTab}
                colorScheme={colorScheme}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div style={{ 
                  width: '6rem',
                  height: '6rem',
                  borderRadius: '50%',
                  backgroundColor: '#f9fafb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <FileText size={40} style={{ color: '#9ca3af' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>Detailed Information</h3>
                <p style={{ color: '#4b5563', maxWidth: '28rem', margin: '0 auto 2rem' }}>
                  Get comprehensive details about this scheme including eligibility criteria, benefits, application process, and more.
                </p>
                <button
                  onClick={() => getSchemeDetails(scheme)}
                  style={{
                    background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    margin: '0 auto',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Award size={20} />
                  Load Detailed Information
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail;