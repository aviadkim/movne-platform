import React, { useState, useRef } from 'react';

const EnhancedTranscript = ({ isRecording, onTranscriptUpdate, regulatoryAnswers }) => {
  const [transcript, setTranscript] = useState([]);
  const scrollRef = useRef(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
      <div className="lg:col-span-2 space-y-4">
        <div 
          ref={scrollRef}
          className="bg-white rounded-lg border border-stone-200 p-4 h-[400px] overflow-y-auto"
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
              <p className="text-finance-300">{entry.text}</p>
            </div>
          ))}
          {isRecording && <div className="text-red-500 text-sm">מקליט...</div>}
        </div>
      </div>
    </div>
  );
};

export default EnhancedTranscript;
