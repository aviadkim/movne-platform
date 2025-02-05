import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RealTimeTranscriptLive from './RealTimeTranscriptLive';
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
  };

  const handleSummary = () => {
    console.log("סיכום ופעולות נלחץ");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Movne Platform – מערכת ייעוץ פיננסי</h1>
        <nav className="dashboard-nav">
          <Link to="/crm" className="nav-link">מערכת CRM</Link>
          <Link to="/client-ticket" className="nav-link">תיק לקוח</Link>
          <Link to="/investment-file" className="nav-link">תיק השקעות</Link>
        </nav>
      </header>
      <main className="dashboard-content">
        <section className="left-panel">
          <div className="transcript-section">
            <h3>תמלול שיחה בשידור חי</h3>
            <RealTimeTranscriptLive onTranscriptUpdate={setTranscript} />
          </div>
          <div className="regulatory-section">
            <h3>שאלות רגולטוריות</h3>
            <RegulatoryQuestions transcript={transcript} />
          </div>
        </section>
        <aside className="right-panel">
          <div className="actions">
            <button className="action-btn">שלח מייל ליועץ</button>
            <button className="action-btn">שלח מייל ללקוח</button>
          </div>
          <div className="recording-controls" data-testid="recording-controls">
            <RecordingControls 
              isRecording={isRecording}
              onStart={handleStart}
              onUpload={handleUpload}
              onSummary={handleSummary}
            />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;
