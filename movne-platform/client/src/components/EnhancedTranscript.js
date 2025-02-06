import React, { useRef, useEffect } from 'react';

const EnhancedTranscript = ({ isRecording, transcript, className }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  return (
    <div 
      ref={scrollRef}
      className={`p-4 overflow-y-auto ${className}`}
    >
      {transcript.map((entry, index) => (
        <div 
          key={index}
          className={`mb-4 p-3 rounded-lg ${
            entry.speaker === 'יועץ' 
              ? 'bg-finance-50 mr-8' 
              : 'bg-trust-50 ml-8'
          }`}
        >
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span className="font-medium">{entry.speaker}</span>
            <span>{entry.timestamp}</span>
          </div>
          <p className="text-finance-300 text-lg leading-relaxed">{entry.text}</p>
        </div>
      ))}
      {isRecording && (
        <div className="flex items-center gap-2 text-red-500 animate-pulse">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          מקליט...
        </div>
      )}
    </div>
  );
};

export default EnhancedTranscript;
