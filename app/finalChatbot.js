"use client";

import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import ChatInterface from './chatbot/ChatInterface'
import SchemeChatbot from './scheme-chatbot/SchemeChatbot';

const FinalChatbot = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [showGlobalChat, setShowGlobalChat] = useState(false)
   const [showSchemaChat, setShowSchemaChat] = useState(false)
   const [messages, setMessages] = useState([
     {
       id: 1,
       text: "Hello! I'm your AI assistant. I can help you with various questions about education, careers, and more. How can I assist you today?",
       sender: 'bot',
       timestamp: new Date().toLocaleTimeString()
     }
   ])
   const [inputMessage, setInputMessage] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [userProfile, setUserProfile] = useState({
     age: 20,
     state: '',
     education: 'Undergraduate'
   })

   const handleSchemaChatbot = () => {
     setShowSchemaChat(true)
     setIsOpen(false)
   }

   const handleGlobeChatbot = () => {
     setShowGlobalChat(true)
     setIsOpen(false)
   }

   return (
     <div className="fixed bottom-6 right-6 z-50">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg"
       >
         <MessageCircle className="w-6 h-6" />
       </button>

       {isOpen && (
         <div className="absolute bottom-10 right-0 w-80  border bg-gradient-to-r from-blue-100 to-sky-100 border-gray-800 border-2 rounded-2xl shadow-xl p-6 z-10">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold text-gray-900">GovScheme Chatbot</h3>
             <button 
               onClick={() => setIsOpen(false)}
               className="p-2 hover:bg-gray-100 rounded-full"
             >
               <X className="w-5 h-5 text-gray-600" />
             </button>
           </div>
           <div className="space-y-4">
             <button 
               onClick={handleSchemaChatbot}
               className="w-full p-4 bg-sky-300 border-2 border-gray-800 text-white rounded-xl hover:bg-sky-400 hover:cursor-pointer shadow-lg"
             >
               <div className="flex items-center justify-between">
                 <div className="text-left">
                   <div className="font-bold text-black text-lg">AGENTIC CHATBOT</div>
                   <div className="text-gray-800 text-sm">Smart scheme finder</div>
                 </div>
                 <div className="w-8 h-8 bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                   <MessageCircle className="w-4 h-4" />
                 </div>
               </div>
             </button>
             <button 
               onClick={handleGlobeChatbot}
               className="w-full p-4 bg-blue-300 border-2 hover:cursor-pointer border-gray-800 text-white rounded-xl hover:bg-blue-400 shadow-lg"
             >
               <div className="flex items-center justify-between">
                 <div className="text-left">
                   <div className="font-bold text-black text-lg">RAG CHATBOT</div>
                   <div className="text-gray-800 text-sm">General assistance</div>
                 </div>
                 <div className="w-8 h-8 bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                   <MessageCircle className="w-4 h-4" />
                 </div>
               </div>
             </button>
           </div>
         </div>
       )}
       
       {showGlobalChat && (
         <ChatInterface 
           isOpen={showGlobalChat}
           setIsOpen={setShowGlobalChat}
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
       
       {showSchemaChat && (
         <SchemeChatbot 
           isOpen={showSchemaChat}
           setIsOpen={setShowSchemaChat}
         />
       )}
     </div>
   )
}

export default FinalChatbot