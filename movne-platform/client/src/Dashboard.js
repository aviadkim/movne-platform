// Dashboard.js
import React, { useState } from 'react';
import RealTimeTranscript from './RealTimeTranscriptLive';
import RegulatoryQuestions from './RegulatoryQuestions';
import RecordingControls from './RecordingControls'; // <-- שורת הייבוא החדשה
import './Dashboard.css';

function Dashboard() {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // פונקציות לדוגמה – ניתן להתאים לפי הצורך
  const handleStart = () => {
    setIsRecording(true);
    console.log("start clicked");
  };

  const handleUpload = () => {
    console.log("upload clicked");
  };

  const handleSummary = () => {
    console.log("summary clicked");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Movne Platform – מערכת ייעוץ פיננסי</h1>
      </header>
      <div className="dashboard-main">
        <div className="left-panel">
          <RealTimeTranscript onTranscriptUpdate={setTranscript} />
          <RegulatoryQuestions transcript={transcript} />
        </div>
        <div className="right-panel">
          <div className="actions">
            <button className="action-button">שלח מייל ליועץ</button>
            <button className="action-button">שלח מייל ללקוח</button>
          </div>
          {/* הוספת רכיב RecordingControls */}
          <RecordingControls 
            isRecording={isRecording} 
            onStart={handleStart} 
            onUpload={handleUpload} 
            onSummary={handleSummary} 
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
