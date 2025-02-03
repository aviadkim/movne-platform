import React from 'react';
import './RecordingControls.css';

function RecordingControls() {
  const startRecording = () => alert('הקלטה החלה');
  const uploadRecording = () => alert('הקלטה הועלתה');
  const showSummary = () => alert('מציג סיכום ופעולות');
  return (
    <div className="recording-controls flex gap-4 mb-4">
      <button onClick={startRecording} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        התחלת הקלטה
      </button>
      <button onClick={uploadRecording} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        העלאת הקלטה
      </button>
      <button onClick={showSummary} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
        סיכום ופעולות
      </button>
    </div>
  );
}

export default RecordingControls;
