import React from 'react';
import './RecordingControls.css';

const RecordingControls = ({ isRecording, onStart, onUpload, onSummary }) => {
  return (
    <div className="recording-controls-component">
      <button onClick={onStart}>
        {isRecording ? "הקלטה בהפעלה" : "התחל הקלטה"}
      </button>
      <button onClick={onUpload}>העלה הקלטה</button>
      <button onClick={onSummary}>סיכום ופעולות</button>
    </div>
  );
};

export default RecordingControls;
