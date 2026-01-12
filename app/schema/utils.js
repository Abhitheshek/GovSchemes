"use client"

import toast from 'react-hot-toast';

export const handleError = (error) => {
  console.error('Error:', error);
  toast.error('Something went wrong. Please try again later.');
};

export const parseJsonResponse = (response) => {
  try {
    const jsonMatch = response.match(/\[?\s*\{[\s\S]*\}\s*\]?/);
    if (!jsonMatch) return null;
    
    // Simple JSON cleaning - just remove trailing commas
    let cleanJson = jsonMatch[0]
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/\n/g, ' ')
      .trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('JSON parsing error:', error);
    try {
      const jsonMatch = response.match(/\[?\s*\{[\s\S]*\}\s*\]?/);
      console.log('Failed JSON:', jsonMatch?.[0]?.substring(0, 500));
    } catch (e) {}
    return null;
  }
};

export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

export const getStatusColor = (status) => {
  const colors = {
    'Active': 'bg-green-100 text-green-800',
    'Proposed': 'bg-yellow-100 text-yellow-800',
    'Under Review': 'bg-blue-100 text-blue-800',
    'default': 'bg-gray-100 text-gray-800'
  };
  return colors[status] || colors.default;
};

export const formatCurrency = (amount) => {
  if (!amount) return amount;
  
  const numericValue = amount.replace(/[^0-9.]/g, '');
  const value = parseFloat(numericValue);
  
  if (isNaN(value)) return amount;
  
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  
  return amount;
};

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push((currentYear - i).toString());
  }
  return years;
};

export const getCategoryOptions = () => [
  'Agriculture',
  'Healthcare',
  'Education',
  'Employment',
  'Housing',
  'Business',
  'Infrastructure',
  'Social Welfare'
];

export const getStatusOptions = () => [
  'Active',
  'Proposed',
  'Under Review'
];