// src/Dashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RealTimeTranscriptLive from './RealTimeTranscriptLive';
import RegulatoryQuestions from './RegulatoryQuestions';
import RecordingControls from './RecordingControls';
import './Dashboard.css';

const Dashboard = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // פונקציות פעולה עם לוגיקה מובנית
  const handleStart = () => {
    setIsRecording(true);
    console.log("התחל הקלטה נלחץ");
  };

  const handleUpload = () => {
    console.log("העלה הקלטה נלחץ");
    // כאן תוכל להוסיף קריאה ל-API להעלאת ההקלטה
  };

  const handleSummary = () => {
    console.log("סיכום ופעולות נלחץ");
    // כאן תוכל להוסיף סיכום הקלטה או פעולות נוספות
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Movne Platform – מערכת ייעוץ פיננסי</h1>
        <nav className="dashboard-nav">
          <Link to="/crm" className="nav-link">מערכת CRM</Link>
          <Link to="/client-ticket" className="nav-link">תיק לקוח</Link>
          <Link to="/investment-file" className="nav-link">תיק השקעות</Link>
        </nav>
      </header>
      <div className="dashboard-main">
        <section className="left-panel">
          <RealTimeTranscriptLive onTranscriptUpdate={setTranscript} />
          <RegulatoryQuestions transcript={transcript} />
        </section>
        <aside className="right-panel">
          <div className="actions">
            <button className="action-button">שלח מייל ליועץ</button>
            <button className="action-button">שלח מייל ללקוח</button>
          </div>
          <RecordingControls 
            isRecording={isRecording} 
            onStart={handleStart} 
            onUpload={handleUpload} 
            onSummary={handleSummary} 
          />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
