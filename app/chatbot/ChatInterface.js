"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Loader2, Settings, Trash2, ChevronDown, ArrowRight } from 'lucide-react';
import MarkdownFormatter from './MarkdownFormatter';

const ChatInterface = ({ 
  isOpen, 
  setIsOpen, 
  messages, 
  setMessages, 
  inputMessage, 
  setInputMessage, 
  isLoading, 
  setIsLoading,
  userProfile,
  setUserProfile
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const profileFormRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && profileCompleted) {
      inputRef.current.focus();
    }
  }, [isOpen, profileCompleted]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://chatbot-ibm.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_profile: userProfile,
          question: inputMessage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMsg = {
        id: Date.now() + 1,
        text: data.response || data.answer || data.message || JSON.stringify(data, null, 2),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = {
        id: Date.now() + 1,
        text: `**Error:** Sorry, I encountered an issue while processing your request. Please check your connection and try again.\n\n*Error details: ${error.message}*`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setShowSettings(false);
  };

  const handleProfileSubmit = () => {
    setProfileCompleted(true);
    // Initialize chat with welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: `Hello! Thanks for providing your information. I'm your AI assistant. How can I help you today?`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const isProfileValid = () => {
    return (
      userProfile.age > 0 && 
      userProfile.state && userProfile.state.trim() !== '' && 
      userProfile.education && userProfile.education.trim() !== ''
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end p-4 z-50 bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-4 rounded-t-2xl flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">SAHAYATA</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {profileCompleted && (
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && profileCompleted && (
          <div className="p-5 bg-gray-50 border-b border-gray-200 animate-slideDown">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-600" />
                User Profile
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors text-xs font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Chat
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                  aria-label="Close settings"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Age</label>
                <input
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({...userProfile, age: parseInt(e.target.value) || 20})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">State</label>
                <input
                  type="text"
                  value={userProfile.state}
                  onChange={(e) => setUserProfile({...userProfile, state: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your state"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Education</label>
                <div className="relative">
                  <select
                    value={userProfile.education}
                    onChange={(e) => setUserProfile({...userProfile, education: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  >
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {!profileCompleted ? (
          /* User Profile Form */
          <div 
            ref={profileFormRef}
            className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-gray-50 to-white"
          >
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to AI Assistant</h2>
                <p className="text-gray-600">Please tell us a bit about yourself to get started</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <label className="text-sm font-medium text-gray-700 block mb-2">Age</label>
                  <input
                    type="number"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile({...userProfile, age: parseInt(e.target.value) || 20})}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter your age"
                  />
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <label className="text-sm font-medium text-gray-700 block mb-2">State</label>
                  <input
                    type="text"
                    value={userProfile.state}
                    onChange={(e) => setUserProfile({...userProfile, state: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter your state"
                  />
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <label className="text-sm font-medium text-gray-700 block mb-2">Education</label>
                  <div className="relative">
                    <select
                      value={userProfile.education}
                      onChange={(e) => setUserProfile({...userProfile, education: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="">Select your education level</option>
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sticky bottom-0 bg-white p-4 border-t border-gray-100">
                <button
                  onClick={handleProfileSubmit}
                  disabled={!isProfileValid()}
                  className={`w-full p-4 flex items-center justify-center gap-2 rounded-xl text-white font-medium shadow-md transition-all ${
                    isProfileValid() 
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-lg transform hover:scale-[1.02]' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Continue to Chat
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-center text-gray-500 mt-3">
                  Your information helps us provide better assistance
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <>
            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-gray-50 to-white"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl rounded-tr-none shadow-md'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none shadow-sm'
                    } px-4 py-3`}
                  >
                    {message.sender === 'bot' ? (
                      <MarkdownFormatter content={message.text} />
                    ) : (
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    )}
                    <p className={`text-xs mt-1.5 ${
                      message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                      <span className="text-xs font-medium text-white">You</span>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <Bot className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <p className="text-sm text-gray-600">AI is thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white rounded-b-2xl shadow-inner">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className={`p-3.5 ${!inputMessage.trim() || isLoading ? 'bg-gray-300' : 'bg-gradient-to-r from-indigo-600 to-violet-600'} text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;