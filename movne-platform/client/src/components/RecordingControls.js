import React from 'react';

const RecordingControls = ({ isRecording, onStart, onStop, onUpload }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={isRecording ? onStop : onStart}
        className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-trust-400 hover:bg-trust-500 text-white'}`}
      >
        {isRecording ? 'הפסק הקלטה' : 'התחל הקלטה'}
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
