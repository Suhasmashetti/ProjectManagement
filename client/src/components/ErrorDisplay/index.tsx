import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const ErrorDisplay = ({ 
  message = 'An error occurred', 
  onRetry,
  size = 'md' 
}: ErrorDisplayProps) => {
  const sizeClasses = {
    sm: {
      icon: 'w-8 h-8',
      text: 'text-sm',
      title: 'text-base',
      container: 'p-4'
    },
    md: {
      icon: 'w-12 h-12',
      text: 'text-base',
      title: 'text-lg',
      container: 'p-8'
    },
    lg: {
      icon: 'w-16 h-16',
      text: 'text-lg',
      title: 'text-xl',
      container: 'p-12'
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClasses[size].container}`}>
      <div className="flex items-center justify-center mb-4">
        <AlertTriangle 
          className={`${sizeClasses[size].icon} text-red-500 dark:text-red-400`} 
        />
      </div>
      
      <h3 className={`${sizeClasses[size].title} font-semibold text-gray-800 dark:text-white mb-2`}>
        Something went wrong
      </h3>
      
      <p className={`${sizeClasses[size].text} text-gray-600 dark:text-gray-300 text-center mb-6 max-w-md`}>
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;