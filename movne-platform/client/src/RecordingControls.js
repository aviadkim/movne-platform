import React from 'react';

const RecordingControls = ({ isRecording, onStart, onUpload, onSummary }) => {
  return (
    <div className="space-y-3">
      <button
        onClick={onStart}
        className={`w-full py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg
                   ${isRecording 
                     ? 'bg-red-500 text-white hover:bg-red-600' 
                     : 'bg-trust-400 text-white hover:bg-finance-400'}`}
      >
        {isRecording ? 'הקלטה בהפעלה' : 'התחל הקלטה'}
      </button>
      
      <button
        onClick={onUpload}
        className="w-full py-3 px-4 bg-trust-500 text-white rounded-lg
                 hover:bg-finance-400 transition-all duration-300 
                 shadow-md hover:shadow-lg"
      >
        העלה הקלטה
      </button>
      
      <button
        onClick={onSummary}
        className="w-full py-3 px-4 bg-finance-300 text-white rounded-lg
                 hover:bg-finance-400 transition-all duration-300 
                 shadow-md hover:shadow-lg"
      >
        סיכום ופעולות
      </button>
    </div>
  );
};

export default RecordingControls;
