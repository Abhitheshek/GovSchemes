"use client";

import React, { useState } from 'react';
import LandingPage from './LandingPage';
import ChatInterface from './ChatInterface';
import ChatButton from './ChatButton';

const ChatBot = () => {
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
    <div className="relative">
      {/* Landing Page */}
      <LandingPage setIsOpen={setIsOpen} />
      
      {/* Chat Button */}
      <ChatButton setIsOpen={setIsOpen} />
      
      {/* Chat Interface */}
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
    </div>
  );
};

export default ChatBot;