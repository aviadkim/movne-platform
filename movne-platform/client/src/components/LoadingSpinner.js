import React from 'react';

const LoadingSpinner = ({ text = 'טוען...' }) => (
  <div className="flex flex-col items-center justify-center p-4">
    <div className="w-8 h-8 border-4 border-finance-300 border-t-transparent rounded-full animate-spin"></div>
    <span className="mt-2 text-finance-300">{text}</span>
  </div>
);

export default LoadingSpinner;
