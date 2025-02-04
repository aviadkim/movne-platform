// Dashboard.js
import React, { useState } from 'react';
import RealTimeTranscript from './RealTimeTranscript';
import RegulatoryQuestions from './RegulatoryQuestions';
import './Dashboard.css';

function Dashboard() {
  const [transcript, setTranscript] = useState("");

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
          {/* כאן ניתן להוסיף רכיבים נוספים כגון CRM, Ticket לקוח וכדומה */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
