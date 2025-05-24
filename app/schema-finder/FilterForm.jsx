import React, { useState } from 'react';
import { Filter, Search, X, ChevronDown, Sparkles, MapPin, Users, Calendar, Briefcase, Clock, Wallet } from 'lucide-react';

const FilterForm = ({ 
  formData, 
  handleInputChange, 
  searchSchemes, 
  resetForm, 
  loading,
  categories,
  states,
  beneficiaryTypes,
  levels,
  ageGroups,
  incomeRanges
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeFilters, setActiveFilters] = useState(0);
  
  // Count active filters
  React.useEffect(() => {
    const count = Object.values(formData).filter(value => value !== '').length;
    setActiveFilters(count);
  }, [formData]);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
        padding: '24px',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: activeFilters > 0 ? '16px' : '0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '8px', 
              padding: '8px' 
            }}>
              <Filter size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Filter Schemes</h2>
              <p style={{ fontSize: '14px', margin: '4px 0 0 0', opacity: 0.8 }}>Find schemes matching your criteria</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {isExpanded ? 'Hide' : 'Show'} Filters
            <ChevronDown size={16} style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.3s'
            }} />
          </button>
        </div>
        
        {/* Active filters */}
        {activeFilters > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.entries(formData).map(([key, value]) => {
              if (!value) return null;
              
              // Format the key for display
              const keyDisplay = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              
              return (
                <div key={key} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '4px 12px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>{keyDisplay}: {value}</span>
                  <button 
                    onClick={() => handleInputChange(key, '')}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
            
            <button 
              onClick={resetForm}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '16px',
                padding: '4px 12px',
                fontSize: '14px',
                cursor: 'pointer',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <X size={14} />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Filter form */}
      <div style={{
        maxHeight: isExpanded ? '1000px' : '0',
        opacity: isExpanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.3s',
        padding: isExpanded ? '24px' : '0'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {/* Category */}
          <div style={{ position: 'relative' }}>
            <Briefcase size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6366f1' }} />
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                appearance: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select Category</option>
              {categories.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
          
          {/* State */}
          <div style={{ position: 'relative' }}>
            <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6366f1' }} />
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                appearance: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select State/UT</option>
              {states.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
          
          {/* Beneficiary Type */}
          <div style={{ position: 'relative' }}>
            <Users size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6366f1' }} />
            <select
              value={formData.beneficiaryType}
              onChange={(e) => handleInputChange('beneficiaryType', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                appearance: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select Beneficiary Type</option>
              {beneficiaryTypes.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
          
          {/* Level */}
          <div style={{ position: 'relative' }}>
            <Filter size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6366f1' }} />
            <select
              value={formData.level}
              onChange={(e) => handleInputChange('level', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                appearance: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select Scheme Level</option>
              {levels.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
          
          {/* Age Group */}
          <div style={{ position: 'relative' }}>
            <Clock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6366f1' }} />
            <select
              value={formData.ageGroup}
              onChange={(e) => handleInputChange('ageGroup', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                appearance: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select Age Group</option>
              {ageGroups.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
          
          {/* Income Range */}
          <div style={{ position: 'relative' }}>
            <Wallet size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6366f1' }} />
            <select
              value={formData.incomeRange}
              onChange={(e) => handleInputChange('incomeRange', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                appearance: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select Income Range</option>
              {incomeRanges.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div style={{
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #f3f4f6',
        display: 'flex',
        flexDirection: window.innerWidth < 640 ? 'column' : 'row',
        gap: '12px'
      }}>
        <button
          onClick={searchSchemes}
          disabled={loading}
          style={{
            flex: '1',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <span>Searching...</span>
            </>
          ) : (
            <>
              <Search size={16} />
              <span>Find Schemes</span>
              {activeFilters > 0 && (
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '9999px',
                  padding: '2px 8px',
                  fontSize: '12px',
                  marginLeft: '4px'
                }}>
                  {activeFilters}
                </span>
              )}
            </>
          )}
        </button>
        
        <button
          onClick={() => {
            resetForm();
            setIsExpanded(true);
          }}
          style={{
            padding: '12px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            color: '#4b5563'
          }}
        >
          <X size={16} />
          <span>Reset</span>
        </button>
        
        <button
          style={{
            display: window.innerWidth < 640 ? 'none' : 'flex',
            padding: '12px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <Sparkles size={16} />
          <span>AI Suggestions</span>
        </button>
      </div>
      
      {/* Add keyframe animation for spin */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FilterForm;