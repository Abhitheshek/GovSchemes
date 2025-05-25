"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatButton = ({ setIsOpen }) => {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center z-50"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default ChatButton;