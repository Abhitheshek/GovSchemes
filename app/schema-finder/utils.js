// Enhanced utility functions for formatting and parsing AI responses

/**
 * Parses the AI response to extract structured content
 * @param {string} text - Raw text from AI response
 * @returns {object} - Parsed and formatted content
 */
export const parseAIResponse = (text) => {
  if (!text) return {};
  
  // Extract sections based on markdown headings
  const sections = {};
  
  // Match markdown headings (## Heading)
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  let lastHeading = null;
  let lastIndex = 0;
  
  // Find all headings and their content
  while ((match = headingRegex.exec(text)) !== null) {
    if (lastHeading) {
      sections[lastHeading] = text.substring(lastIndex, match.index).trim();
    }
    lastHeading = match[2].trim();
    lastIndex = match.index + match[0].length;
  }
  
  // Add the last section
  if (lastHeading) {
    sections[lastHeading] = text.substring(lastIndex).trim();
  }
  
  return sections;
};

/**
 * Formats the AI response with enhanced styling
 * @param {string} text - Raw text from AI response
 * @returns {string} - HTML formatted content
 */
export const formatAIResponse = (text) => {
  if (!text) return '';
  
  // Process the text in multiple passes for better formatting
  let formattedText = text;
  
  // First, wrap lists in <ul> tags
  formattedText = formattedText.replace(
    /((?:^|\n)- .+(?:\n- .+)*)/g, 
    '<ul class="list-disc pl-6 my-4 space-y-2">$1</ul>'
  );
  
  // Replace headings with styled headings
  formattedText = formattedText.replace(
    /^(#{2})\s+(.+)$/gm, 
    '<h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">$2</h2>'
  );
  
  formattedText = formattedText.replace(
    /^(#{3})\s+(.+)$/gm, 
    '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">$2</h3>'
  );
  
  // Format lists with proper styling
  formattedText = formattedText.replace(
    /^-\s+(.+)$/gm, 
    '<li class="text-gray-700">$1</li>'
  );
  
  // Format bold text with color highlighting for important items
  formattedText = formattedText.replace(
    /\*\*(.+?)\*\*/g, 
    '<strong class="font-semibold text-indigo-700">$1</strong>'
  );
  
  // Format italic text
  formattedText = formattedText.replace(
    /\*(.+?)\*/g, 
    '<em class="text-gray-600 italic">$1</em>'
  );
  
  // Format links with modern styling
  formattedText = formattedText.replace(
    /\[(.+?)\]\((.+?)\)/g, 
    '<a href="$2" class="text-blue-600 hover:text-blue-800 underline decoration-blue-300 decoration-2 underline-offset-2 transition-colors">$1</a>'
  );
  
  // Add paragraph styling
  formattedText = formattedText.replace(
    /^(?!<[hl]|<ul|<li|$)(.+)$/gm,
    '<p class="text-gray-700 mb-4 leading-relaxed">$1</p>'
  );
  
  // Add special styling for key takeaways section
  formattedText = formattedText.replace(
    /<h2 class="[^"]*">(Key Takeaways)<\/h2>/,
    '<div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl mb-8 shadow-sm border border-blue-100">' +
    '<h2 class="text-2xl font-bold text-indigo-800 mb-4 flex items-center">' +
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />' +
    '</svg>$1</h2>'
  );
  
  formattedText = formattedText.replace(
    /(<h2 class="[^"]*">(?!Key Takeaways))/g,
    '</div>$1'
  );
  
  // Close the key takeaways div if it exists
  if (formattedText.includes('Key Takeaways') && !formattedText.endsWith('</div>')) {
    formattedText += '</div>';
  }
  
  return formattedText;
};

/**
 * Extracts key points from a longer text
 * @param {string} text - Full text
 * @param {number} maxPoints - Maximum number of points to extract
 * @returns {string[]} - Array of key points
 */
export const extractKeyPoints = (text, maxPoints = 5) => {
  if (!text) return [];
  
  // First try to extract from Key Takeaways section if it exists
  const keyTakeawaysMatch = text.match(/## Key Takeaways\s+([\s\S]*?)(?=##|$)/);
  
  if (keyTakeawaysMatch) {
    const takeaways = keyTakeawaysMatch[1]
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s+/, '').trim())
      .filter(line => line.length > 0)
      .slice(0, maxPoints);
    
    if (takeaways.length > 0) {
      return takeaways;
    }
  }
  
  // Fallback to extracting from the full text
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  
  // Look for sentences with key indicators of importance
  const keywordIndicators = [
    'important', 'key', 'critical', 'essential', 'significant',
    'must', 'should', 'eligibility', 'requirement', 'deadline',
    'benefit', 'advantage', 'feature', 'primary', 'main'
  ];
  
  const keyPoints = sentences
    .filter(sentence => 
      keywordIndicators.some(keyword => 
        sentence.toLowerCase().includes(keyword)
      )
    )
    .map(point => point.trim())
    .slice(0, maxPoints);
  
  return keyPoints.length > 0 ? keyPoints : sentences.slice(0, maxPoints);
};

/**
 * Gets an appropriate icon name based on scheme category
 * @param {string} category - Scheme category
 * @returns {string} - Icon name for Lucide icons
 */
export const getCategoryIcon = (category = '') => {
  const categoryLower = category.toLowerCase();
  
  // Import these from lucide-react
  const { Sprout, GraduationCap, Stethoscope, Heart, Users, Briefcase, Home, Mountain, Wallet, Laptop, Leaf, Store, Award } = require('lucide-react');
  
  if (categoryLower.includes('agriculture') || categoryLower.includes('farm')) {
    return Sprout;
  } else if (categoryLower.includes('education') || categoryLower.includes('skill')) {
    return GraduationCap;
  } else if (categoryLower.includes('health') || categoryLower.includes('medical')) {
    return Stethoscope;
  } else if (categoryLower.includes('women') || categoryLower.includes('child')) {
    return Heart;
  } else if (categoryLower.includes('social') || categoryLower.includes('welfare')) {
    return Users;
  } else if (categoryLower.includes('employment') || categoryLower.includes('labour')) {
    return Briefcase;
  } else if (categoryLower.includes('housing') || categoryLower.includes('urban')) {
    return Home;
  } else if (categoryLower.includes('rural')) {
    return Mountain;
  } else if (categoryLower.includes('financial') || categoryLower.includes('inclusion')) {
    return Wallet;
  } else if (categoryLower.includes('digital')) {
    return Laptop;
  } else if (categoryLower.includes('environment') || categoryLower.includes('climate')) {
    return Leaf;
  } else if (categoryLower.includes('msme') || categoryLower.includes('entrepreneur')) {
    return Store;
  }
  
  return Award;
};

/**
 * Gets a color scheme based on scheme category
 * @param {string} category - Scheme category or color hint
 * @returns {object} - Color classes for various UI elements
 */
export const getCategoryColorScheme = (category = '') => {
  const colorMap = {
    'blue': {
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      accent: 'text-blue-600',
      gradient: 'from-blue-600 to-indigo-600',
      hover: 'hover:bg-blue-100'
    },
    'green': {
      light: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      accent: 'text-green-600',
      gradient: 'from-green-600 to-teal-600',
      hover: 'hover:bg-green-100'
    },
    'purple': {
      light: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      accent: 'text-purple-600',
      gradient: 'from-purple-600 to-indigo-600',
      hover: 'hover:bg-purple-100'
    },
    'orange': {
      light: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-800',
      accent: 'text-orange-600',
      gradient: 'from-orange-600 to-amber-600',
      hover: 'hover:bg-orange-100'
    },
    'teal': {
      light: 'bg-teal-50',
      border: 'border-teal-200',
      text: 'text-teal-800',
      accent: 'text-teal-600',
      gradient: 'from-teal-600 to-cyan-600',
      hover: 'hover:bg-teal-100'
    },
    'red': {
      light: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      accent: 'text-red-600',
      gradient: 'from-red-600 to-rose-600',
      hover: 'hover:bg-red-100'
    },
    'amber': {
      light: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      accent: 'text-amber-600',
      gradient: 'from-amber-600 to-yellow-600',
      hover: 'hover:bg-amber-100'
    },
    'indigo': {
      light: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-800',
      accent: 'text-indigo-600',
      gradient: 'from-indigo-600 to-violet-600',
      hover: 'hover:bg-indigo-100'
    }
  };
  
  // Default color
  let colorKey = 'blue';
  
  // Try to match category to a color
  const categoryLower = category.toLowerCase();
  
  if (Object.keys(colorMap).includes(categoryLower)) {
    // Direct color name match
    colorKey = categoryLower;
  } else if (categoryLower.includes('agriculture') || categoryLower.includes('environment')) {
    colorKey = 'green';
  } else if (categoryLower.includes('education') || categoryLower.includes('digital')) {
    colorKey = 'indigo';
  } else if (categoryLower.includes('health')) {
    colorKey = 'teal';
  } else if (categoryLower.includes('women') || categoryLower.includes('social')) {
    colorKey = 'purple';
  } else if (categoryLower.includes('employment') || categoryLower.includes('entrepreneur')) {
    colorKey = 'amber';
  } else if (categoryLower.includes('housing') || categoryLower.includes('rural')) {
    colorKey = 'orange';
  } else if (categoryLower.includes('financial')) {
    colorKey = 'green';
  }
  
  return colorMap[colorKey];
};

/**
 * Format a date string in a more readable format
 * @param {string} dateStr - Date string
 * @returns {string} - Formatted date
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
};