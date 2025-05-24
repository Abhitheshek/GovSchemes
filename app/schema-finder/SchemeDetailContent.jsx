import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const SchemeDetailContent = ({ detailedInfo, activeTab, colorScheme }) => {
  if (!detailedInfo) return null;
  
  const [sections, setSections] = useState({});
  const [keyPoints, setKeyPoints] = useState([]);
  
  // Parse the AI response into sections
  useEffect(() => {
    const parsedSections = parseAIResponse(detailedInfo);
    setSections(parsedSections);
    
    // Extract key points
    const keyTakeaways = parsedSections['Key Takeaways'] || '';
    const extractedPoints = keyTakeaways
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s+/, '').trim())
      .filter(line => line.length > 0);
    
    setKeyPoints(extractedPoints.length > 0 ? extractedPoints : []);
  }, [detailedInfo]);
  
  // Parse the AI response to extract structured content
  const parseAIResponse = (text) => {
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
  
  // Format the content with enhanced styling
  const formatContent = (text) => {
    if (!text) return '';
    
    // Process the text for better formatting
    let formattedText = text;
    
    // Format lists with proper styling
    formattedText = formattedText.replace(
      /^-\s+(.+)$/gm, 
      '<li style="margin-bottom: 0.5rem; position: relative; padding-left: 1.5rem;">$1</li>'
    );
    
    // Format bold text with color highlighting for important items
    formattedText = formattedText.replace(
      /\*\*(.+?)\*\*/g, 
      '<strong style="color: #4f46e5; font-weight: 600;">$1</strong>'
    );
    
    // Format italic text
    formattedText = formattedText.replace(
      /\*(.+?)\*/g, 
      '<em style="color: #6b7280; font-style: italic;">$1</em>'
    );
    
    // Format links with modern styling
    formattedText = formattedText.replace(
      /\[(.+?)\]\((.+?)\)/g, 
      '<a href="$2" style="color: #3b82f6; text-decoration: underline; text-decoration-color: #93c5fd; text-decoration-thickness: 2px; text-underline-offset: 2px;">$1</a>'
    );
    
    // Add paragraph styling
    formattedText = formattedText.replace(
      /^(?!<li|<h|$)(.+)$/gm,
      '<p style="margin-bottom: 1rem; line-height: 1.6;">$1</p>'
    );
    
    // Wrap lists in <ul> tags
    formattedText = formattedText.replace(
      /(<li[^>]*>.*<\/li>\n?)+/g,
      '<ul style="list-style-type: none; padding-left: 0; margin-bottom: 1.5rem;">$&</ul>'
    );
    
    return formattedText;
  };
  
  // Get the appropriate content based on active tab
  const getTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return sections['Overview'] || '';
      case 'eligibility':
        return sections['Eligibility Criteria'] || '';
      case 'benefits':
        return sections['Benefits and Coverage'] || '';
      case 'application':
        return sections['Application Process'] || '';
      case 'documents':
        return sections['Required Documents'] || '';
      case 'timeline':
        return sections['Timeline and Deadlines'] || '';
      case 'budget':
        return sections['Budget and Financial Details'] || '';
      case 'contact':
        return sections['Contact Information'] || '';
      default:
        return sections['Overview'] || '';
    }
  };
  
  const formattedContent = formatContent(getTabContent());
  
  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Key Highlights Section */}
      {activeTab === 'overview' && keyPoints.length > 0 && (
        <div style={{
          backgroundColor: '#f0f7ff',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #dbeafe'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1e40af',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            Key Highlights
          </h3>
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            {keyPoints.map((point, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                marginBottom: '0.75rem',
                backgroundColor: 'white',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <CheckCircle size={18} style={{ color: '#4f46e5', flexShrink: 0, marginTop: '0.125rem' }} />
                <span style={{ color: '#374151' }}>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Main Content */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        border: '1px solid #f3f4f6',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div 
          style={{ color: '#374151', lineHeight: '1.6' }}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </div>
      
      {/* Disclaimer */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        backgroundColor: '#fffbeb',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginTop: '2rem',
        border: '1px solid #fef3c7'
      }}>
        <AlertCircle size={20} style={{ color: '#d97706', flexShrink: 0, marginTop: '0.125rem' }} />
        <div>
          <h4 style={{ color: '#92400e', fontWeight: '600', marginBottom: '0.25rem' }}>Disclaimer</h4>
          <p style={{ color: '#b45309', fontSize: '0.875rem' }}>
            The information provided is based on AI-generated content and may not be complete or up-to-date. 
            Please verify details from official government sources before taking any action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailContent;