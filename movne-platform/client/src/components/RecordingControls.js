import React from 'react';

const RecordingControls = ({ isRecording, onStart, onStop, onUpload, onSummary }) => {
  return (
    <div className="space-y-3">
      <button
        onClick={isRecording ? onStop : onStart}
        className={`w-full py-3 px-4 rounded-lg transition-all duration-300 shadow-md
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-trust-400 hover:bg-trust-500 text-white'}`}
      >
        {isRecording ? 'הפסק הקלטה' : 'התחל הקלטה'}
      </button>
      
      <label className="w-full py-3 px-4 bg-finance-300 text-white rounded-lg hover:bg-finance-400 
                      transition-all duration-300 shadow-md cursor-pointer text-center block">
        העלה הקלטה
        <input 
          type="file" 
          accept="audio/*" 
          onChange={(e) => onUpload(e.target.files[0])}
          className="hidden" 
        />
      </label>
      
      <button
        onClick={onSummary}
        className="w-full py-3 px-4 bg-finance-300 text-white rounded-lg hover:bg-finance-400 
                 transition-all duration-300 shadow-md"
      >
        סיכום ופעולות
      </button>
    </div>
  );
};

export default RecordingControls;
