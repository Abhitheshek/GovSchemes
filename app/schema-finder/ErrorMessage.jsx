import React from 'react';
import { AlertCircle, X, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onDismiss, onRetry }) => {
  if (!message) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-start gap-3 shadow-sm animate-fadeIn">
      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-semibold mb-1">Error</h4>
        <p>{message}</p>
        
        {onRetry && (
          <button 
            onClick={onRetry}
            className="mt-2 text-sm flex items-center gap-1 text-red-600 hover:text-red-800"
          >
            <RefreshCw className="h-3 w-3" />
            Try Again
          </button>
        )}
      </div>
      
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="ml-auto text-red-500 hover:text-red-700"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;