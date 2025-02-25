import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'טוען...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} rounded-full border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent animate-spin`}></div>
      {text && <p className="mt-2 text-gray-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
