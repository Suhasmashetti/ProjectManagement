import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
}

const Loading = ({ 
  size = 'md', 
  text = 'Loading...', 
  variant = 'spinner' 
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
        <div className="relative">
          <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 dark:border-gray-700 dark:border-t-blue-400`} />
          <div className={`${sizeClasses[size]} absolute top-0 animate-spin rounded-full border-4 border-transparent border-r-blue-300 dark:border-r-blue-600`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        {text && (
          <p className={`mt-6 ${textSizeClasses[size]} text-gray-600 dark:text-gray-300 font-medium animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
        <div className="flex space-x-3">
          <div className={`${sizeClasses[size]} bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce`} />
          <div className={`${sizeClasses[size]} bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }} />
          <div className={`${sizeClasses[size]} bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }} />
        </div>
        {text && (
          <p className={`mt-6 ${textSizeClasses[size]} text-gray-600 dark:text-gray-300 font-medium`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-pulse w-full" style={{ contain: 'layout style paint' }}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 grid-layout">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-sm">
                <div className="flex w-full">
                  <div className="w-2 bg-gray-300 dark:bg-gray-600" style={{ animationDelay: `${i * 0.1}s` }} />
                  <div className="flex w-full items-center justify-between bg-white px-5 py-4 dark:bg-gray-800">
                    <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-600" />
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-600" />
                      <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 space-y-3">
                  <div className="h-16 rounded bg-gray-200 dark:bg-gray-600" />
                  <div className="h-16 rounded bg-gray-200 dark:bg-gray-600" />
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-600" />
                    <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {text && (
          <p className={`mt-6 ${textSizeClasses[size]} text-gray-600 dark:text-gray-300 font-medium text-center`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default Loading;