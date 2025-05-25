"use client";

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatInterface from './ChatInterface';

const GlobalChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you with various questions about education, careers, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    age: 20,
    state: '',
    education: 'Undergraduate'
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <ChatInterface 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          messages={messages}
          setMessages={setMessages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
      )}
    </>
  );
};

export default GlobalChatButton;