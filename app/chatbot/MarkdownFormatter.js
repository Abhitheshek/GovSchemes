"use client";

import React from 'react';

const MarkdownFormatter = ({ content }) => {
  const formatMarkdown = (text) => {
    if (!text) return '';
    
    // Enhanced markdown parsing
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-blue-600 border-b border-blue-200 pb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-5 mb-3 text-blue-700 border-b-2 border-blue-300 pb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-4 text-blue-800 border-b-2 border-blue-400 pb-2">$1</h1>')
      
      // Bold and Italic
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em class="text-purple-700">$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800 font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-gray-700 italic">$1</em>')
      
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 border border-gray-300 rounded-lg p-3 my-3 overflow-x-auto"><code class="text-sm text-gray-800 font-mono">$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700">• $1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700 list-decimal list-inside">$1</li>')
      
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-300 pl-4 py-2 my-3 bg-blue-50 text-gray-700 italic">$1</blockquote>')
      
      // Line breaks and paragraphs
      .replace(/\n\n/g, '</p><p class="mb-3 text-gray-700 leading-relaxed">')
      .replace(/\n/g, '<br/>')
      
      // Wrap in paragraph if no other block elements
      .replace(/^(?!<[h|l|b|p])/gm, '<p class="mb-3 text-gray-700 leading-relaxed">');

    // Close any unclosed paragraphs
    if (html && !html.includes('</p>') && html.includes('<p')) {
      html += '</p>';
    }

    return html;
  };

  return (
    <div 
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
    />
  );
};

export default MarkdownFormatter;