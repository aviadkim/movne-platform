// src/Dashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnhancedTranscript from './EnhancedTranscript';
import RegulatoryQuestions from './RegulatoryQuestions';
import RecordingControls from './RecordingControls';
import './Dashboard.css';

const Dashboard = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleStart = () => {
    setIsRecording(true);
    console.log("התחל הקלטה נלחץ");
  };

  const handleUpload = () => {
    console.log("העלה הקלטה נלחץ");
    // כאן ניתן להוסיף קריאה ל-API
  };

  const handleSummary = () => {
    console.log("סיכום ופעולות נלחץ");
    // כאן ניתן להוסיף לוגיקה לסיכום
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
          {/* השתמש ברכיב EnhancedTranscript */}
          <EnhancedTranscript />
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
