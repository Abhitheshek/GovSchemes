"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, ExternalLink, ChevronRight, Filter, Search as SearchIcon, MapPin, Briefcase, Zap, Info, FileText, CheckCircle, Star, X } from 'lucide-react';

const CATEGORIES = [
    "Social welfare & Empowerment",
    "Education & Learning",
    "Agriculture,Rural & Environment",
    "Business & Entrepreneurship",
    "Women and Child",
    "Skills & Employment",
    "Banking,Financial Services and Insurance",
    "Health & Wellness",
    "Sports & Culture",
    "Housing & Shelter",
    "Science, IT & Communications",
    "Transport & Infrastructure",
    "Travel & Tourism",
    "Utility & Sanitation",
    "Public Safety,Law & Justice"
];

const TextFormatter = ({ text }) => {
    if (!text) return null;

    // Helper to process inline formatting (bold, links)
    const formatInline = (str) => {
        // First, handle links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = str.split(urlRegex);

        return parts.map((part, i) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 underline break-all"
                    >
                        {part}
                    </a>
                );
            }
            // Handle Bold
            const boldParts = part.split(/\*\*(.*?)\*\*/g);
            return boldParts.map((subPart, j) => {
                if (j % 2 === 1) { // It's bold content
                    return <strong key={`${i}-${j}`} className="font-semibold text-gray-900">{subPart}</strong>;
                }
                return subPart;
            });
        });
    };

    // Split by newlines and filter empty lines
    const lines = text.split('\n').filter(line => line.trim());

    // Check if the text looks like a list
    const isList = lines.some(line => /^[•\-\*]|\d+\./.test(line.trim()));

    if (isList) {
        return (
            <ul className="space-y-2 ml-1">
                {lines.map((line, i) => {
                    const cleanLine = line.replace(/^[•\-\*]|\d+\.\s*/, '').trim();
                    return (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 shadow-sm"></span>
                            <span>{formatInline(cleanLine)}</span>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <div className="space-y-3">
            {lines.map((line, i) => (
                <p key={i} className="text-gray-700 text-sm leading-relaxed">
                    {formatInline(line)}
                </p>
            ))}
        </div>
    );
};

const SchemeCard = ({ scheme, index }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: FileText, show: !!scheme.description },
        { id: 'eligibility', label: 'Eligibility', icon: CheckCircle, show: !!scheme.eligibility },
        { id: 'benefits', label: 'Benefits', icon: Star, show: !!scheme.benefits },
        { id: 'process', label: 'Process & Docs', icon: Info, show: (!!scheme.application_process || !!scheme.documents_required) }
    ].filter(t => t.show);

    // If active tab is somehow not valid (e.g. data missing), fallback to first available
    useEffect(() => {
        if (!tabs.find(t => t.id === activeTab)) {
            setActiveTab(tabs[0]?.id || 'overview');
        }
    }, [tabs, activeTab]);

    return (
        <div
            className="group bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 mb-6 animate-fadeIn overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Card Header */}
            <div className="p-6 pb-0 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold rounded-2xl flex items-center justify-center shadow-lg text-xl">
                    {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="font-bold text-gray-900 text-xl leading-snug group-hover:text-indigo-600 transition-colors">
                            {scheme.title}
                        </h3>
                        <a
                            href={scheme.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors"
                            title="Open Official Page"
                        >
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 border-b border-gray-100 px-6 flex gap-6 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 text-sm font-semibold flex items-center gap-2 transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full"></span>
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 bg-gray-50/50 min-h-[200px]">
                {activeTab === 'overview' && (
                    <div className="animate-fadeIn">
                        <TextFormatter text={scheme.description} />
                    </div>
                )}

                {activeTab === 'eligibility' && (
                    <div className="animate-fadeIn bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <TextFormatter text={scheme.eligibility} />
                    </div>
                )}

                {activeTab === 'benefits' && (
                    <div className="animate-fadeIn bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                        <TextFormatter text={scheme.benefits} />
                    </div>
                )}

                {activeTab === 'process' && (
                    <div className="animate-fadeIn space-y-4">
                        {scheme.documents_required && (
                            <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wide mb-3">
                                    <FileText size={14} /> Documents Required
                                </h4>
                                <TextFormatter text={scheme.documents_required} />
                            </div>
                        )}
                        {scheme.application_process && (
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wide mb-3">
                                    <Info size={14} /> Application Process
                                </h4>
                                <TextFormatter text={scheme.application_process} />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400">Source: myscheme.gov.in</span>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group/more">
                    See More Details <ChevronRight size={12} className="group-hover/more:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default function SchemeChatbot({ isOpen, setIsOpen }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'text',
            content: "👋 Welcome to the Government Scheme Finder.\nI'm here to help you discover the perfect schemes for your needs.\n\nChoose a search method below to get started.",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchMode, setSearchMode] = useState('keyword'); // 'keyword' | 'filter'
    const [schemeFilters, setSchemeFilters] = useState({
        state: '',
        category: CATEGORIES[0],
        age: ''
    });
    const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (searchMode === 'keyword' && !inputMessage.trim()) return;
        if (searchMode === 'filter' && (!schemeFilters.state || !schemeFilters.category)) return;

        // Check if local API is available
        try {
            await fetch('https://schemaagent-production.up.railway.app/');
        } catch (e) {
            console.log('Checking local API...');
        }

        let userDisplayContent = inputMessage;
        let payload = {};

        if (searchMode === 'filter') {
            setIsFiltersCollapsed(true); // Collapse filters after search
            userDisplayContent = (
                <div className="text-sm font-medium">
                    <div className="flex items-center gap-2 mb-2 text-indigo-100 opacity-90 pb-2 border-b border-indigo-500/30">
                        <Filter size={14} /> Applying Filters
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-indigo-200" />
                            <span>State: {schemeFilters.state}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Briefcase size={14} className="text-indigo-200" />
                            <span>Category: {schemeFilters.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-indigo-200" />
                            <span>Age: {schemeFilters.age || '18'}</span>
                        </div>
                    </div>
                </div>
            );

            payload = {
                filter_state: schemeFilters.state,
                filter_category: schemeFilters.category,
                filter_age: parseInt(schemeFilters.age) || 18
            };
        } else {
            payload = { query: inputMessage };
        }

        const userMsg = {
            id: Date.now(),
            type: searchMode === 'filter' ? 'jsx' : 'text',
            content: userDisplayContent,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);
        setInputMessage('');

        try {
            const schemeResponse = await fetch('https://schemaagent-production.up.railway.app/scrape', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (schemeResponse.ok) {
                const schemeData = await schemeResponse.json();
                const schemes = schemeData.schemes || [];

                if (schemes.length > 0) {
                    const botMsg = {
                        id: Date.now() + 1,
                        type: 'schemes',
                        content: schemes,
                        count: schemes.length,
                        sender: 'bot',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, botMsg]);
                } else {
                    const botMsg = {
                        id: Date.now() + 1,
                        type: 'text',
                        content: `❌ No schemes found - matching your criteria.\n\nTry adjusting your filters (e.g. general category) or use simpler keywords.`,
                        sender: 'bot',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, botMsg]);
                }
            } else {
                const errorText = await schemeResponse.text();
                throw new Error(`API Error: ${schemeResponse.status} - ${errorText}`);
            }

        } catch (error) {
            console.error('Fetch error:', error);
            const errorMsg = {
                id: Date.now() + 1,
                type: 'text',
                content: `⚠️ **API Connection Error**\n\nError: ${error.message}\n\nThe backend server might be starting up (Render takes ~1 minute). Please try again in a moment.`,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center  justify-end p-1 z-50 bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[90vh] flex flex-col overflow-hidden animate-fadeIn ">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-72 bg-indigo-50 rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {/* Header */}
                <div className="bg-white/80 backdrop-blur-md p-2 md:p-3 border-b border-gray-100 flex items-center justify-between z-10 sticky top-0">
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                            <Bot size={20} className="md:hidden text-white" />
                            <Bot size={28} className="hidden md:block text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight">Scheme Finder</h1>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <p className="text-indigo-500 text-xs font-semibold uppercase tracking-wider">AI Powered</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Mode Toggles */}
                        <div className="bg-gray-100/80 p-0.5 md:p-1 rounded-lg md:rounded-xl flex gap-0.5 md:gap-1 shadow-inner hover:shadow-md transition-shadow">
                        <button
                            onClick={() => { setSearchMode('keyword'); setIsFiltersCollapsed(false); }}
                            className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-xs font-bold transition-all duration-300 ${searchMode === 'keyword'
                                ? 'bg-white text-indigo-600 shadow-sm transform scale-100'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                                }`}
                        >
                            <SearchIcon size={12} className="md:hidden" strokeWidth={2.5} />
                            <SearchIcon size={14} className="hidden md:block" strokeWidth={2.5} />
                            <span className="hidden sm:inline">Keyword</span>
                        </button>
                        <button
                            onClick={() => { setSearchMode('filter'); setIsFiltersCollapsed(false); }}
                            className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-xs font-bold transition-all duration-300 ${searchMode === 'filter'
                                ? 'bg-white text-indigo-600 shadow-sm transform scale-100'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                                }`}
                        >
                            <Filter size={12} className="md:hidden" strokeWidth={2.5} />
                            <Filter size={14} className="hidden md:block" strokeWidth={2.5} />
                            <span className="hidden sm:inline">Filters</span>
                        </button>
                        </div>
                        
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen && setIsOpen(false)}
                            className="p-1.5 md:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Close"
                        >
                            <X size={16} className="md:hidden" />
                            <X size={20} className="hidden md:block" />
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-8 space-y-4 md:space-y-8 bg-gradient-to-b from-white to-gray-50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
                            {msg.sender === 'bot' && (
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mr-2 md:mr-4 mt-1 flex-shrink-0">
                                    <Bot size={16} className="md:hidden text-indigo-600" />
                                    <Bot size={20} className="hidden md:block text-indigo-600" />
                                </div>
                            )}

                            <div className={`max-w-[90%] md:max-w-[85%] ${msg.type === 'schemes' ? 'w-full max-w-full md:max-w-3xl' : ''}`}>
                                {msg.type === 'schemes' ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-px flex-1 bg-gray-200"></div>
                                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                                                Found {msg.count} Schemes
                                            </span>
                                            <div className="h-px flex-1 bg-gray-200"></div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            {msg.content.map((scheme, idx) => (
                                                <SchemeCard key={idx} scheme={scheme} index={idx} />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`p-5 rounded-2xl shadow-sm relative ${msg.sender === 'user'
                                        ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-tr-none shadow-indigo-200'
                                        : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-gray-100'
                                        }`}>
                                        {msg.type === 'jsx' ? (
                                            msg.content
                                        ) : (
                                            <div className="prose prose-sm max-w-none text-inherit">
                                                <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.content}</p>
                                            </div>
                                        )}
                                        <p className={`text-[10px] mt-2 text-right opacity-60 font-medium ${msg.sender === 'user' ? 'text-indigo-100' : 'text-gray-400'}`}>
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start animate-fadeIn pl-2">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                <Bot size={20} className="text-indigo-600" />
                            </div>
                            <div className="bg-white border border-gray-100 px-6 py-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-4">
                                <div className="flex space-x-1.5">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span className="text-sm text-gray-500 font-medium">Analyzing database...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Controls Area */}
                <div className="bg-white/80 backdrop-blur-md border-t border-gray-100 p-2 md:p-3 z-20">
                    {/* Mode Logic */}
                    <div className="w-full">
                        {/* Input Area */}
                        {searchMode === 'keyword' ? (
                            <div className="flex gap-2 md:gap-4 items-center bg-white p-1 rounded-xl md:rounded-2xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-300">
                                <div className="pl-2 md:pl-4 text-gray-400">
                                    <SearchIcon size={16} className="md:hidden" />
                                    <SearchIcon size={20} className="hidden md:block" />
                                </div>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder="Search schemes..."
                                    className="flex-1 py-2 md:py-3 bg-transparent focus:outline-none focus:ring-0 focus:border-none text-gray-800 placeholder-gray-400 font-medium text-sm md:text-base"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isLoading || !inputMessage.trim()}
                                    className="bg-indigo-600 text-white p-2 md:p-3.5 rounded-lg md:rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-indigo-200 active:scale-95"
                                >
                                    <Send size={16} className="md:hidden" />
                                    <Send size={20} className="hidden md:block" />
                                </button>
                            </div>
                        ) : (
                            isFiltersCollapsed ? (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-indigo-50 border border-indigo-100 p-3 md:p-4 rounded-xl md:rounded-2xl animate-fadeIn shadow-sm gap-3">
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 overflow-x-auto">
                                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Active:</span>
                                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-indigo-100 shadow-sm text-xs">
                                            <MapPin size={12} className="text-indigo-500" /> {schemeFilters.state}
                                        </div>
                                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-indigo-100 shadow-sm text-xs">
                                            <Briefcase size={12} className="text-indigo-500" /> {schemeFilters.category.substring(0, 15)}...
                                        </div>
                                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-indigo-100 shadow-sm text-xs">
                                            <Zap size={12} className="text-indigo-500" /> {schemeFilters.age || '18'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsFiltersCollapsed(false)}
                                        className="text-indigo-600 text-sm font-bold hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-sm animate-fadeIn">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 mb-4 md:mb-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">State</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-2.5 md:left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Gujarat"
                                                    value={schemeFilters.state}
                                                    onChange={(e) => setSchemeFilters({ ...schemeFilters, state: e.target.value })}
                                                    className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Age</label>
                                            <div className="relative">
                                                <Zap className="absolute left-2.5 md:left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    type="number"
                                                    placeholder="e.g. 21"
                                                    value={schemeFilters.age}
                                                    onChange={(e) => setSchemeFilters({ ...schemeFilters, age: e.target.value })}
                                                    className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 md:gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Category</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-2.5 md:left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                <select
                                                    value={schemeFilters.category}
                                                    onChange={(e) => setSchemeFilters({ ...schemeFilters, category: e.target.value })}
                                                    className="w-full pl-8 md:pl-10 pr-8 md:pr-10 py-2.5 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm font-medium appearance-none cursor-pointer"
                                                >
                                                    {CATEGORIES.map((cat, idx) => (
                                                        <option key={idx} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                                <ChevronRight className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={14} />
                                            </div>
                                        </div>

                                        <button
                                            onClick={sendMessage}
                                            disabled={isLoading || !schemeFilters.state}
                                            className="w-full h-[45px] md:h-[50px] bg-indigo-600 text-white px-6 md:px-8 rounded-lg md:rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-indigo-200 font-bold text-sm tracking-wide flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <Send size={16} className="md:hidden" />
                                            <Send size={18} className="hidden md:block" /> 
                                            <span className="hidden sm:inline">FIND SCHEMES</span>
                                            <span className="sm:hidden">FIND</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Styles for animation */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-slideUp { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </div>
    );
}
