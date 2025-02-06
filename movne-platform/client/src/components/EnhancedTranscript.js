import React from 'react';

const EnhancedTranscript = ({ transcript, className }) => {
  return (
    <div className={`p-4 overflow-y-auto ${className}`}>
      {transcript.map((item, index) => (
        <div key={index} className="mb-2">
          <span className="text-xs text-gray-500">{item.timestamp}</span>
          <p className="text-gray-800">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default EnhancedTranscript;
