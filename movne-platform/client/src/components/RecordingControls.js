import React, { useState, useEffect } from 'react';

const RecordingControls = ({ isRecording, onStart, onStop, onUpload }) => {
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      setTimer(interval);
    } else {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
        setDuration(0);
      }
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording, timer]); // Added timer to dependencies

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={isRecording ? onStop : onStart}
        className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm flex items-center gap-2
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-trust-400 hover:bg-trust-500 text-white'}`}
      >
        {isRecording ? (
          <>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            הפסק הקלטה
            <span className="text-xs opacity-75">
              {formatDuration(duration)}
            </span>
          </>
        ) : (
          'התחל הקלטה'
        )}
      </button>
      
      <label className="px-4 py-2 bg-finance-300 text-white rounded-lg hover:bg-finance-400 
                     transition-all duration-300 cursor-pointer text-sm">
        העלה הקלטה
        <input 
          type="file" 
          accept="audio/*" 
          onChange={(e) => onUpload(e.target.files[0])}
          className="hidden" 
        />
      </label>
    </div>
  );
};

export default RecordingControls;
