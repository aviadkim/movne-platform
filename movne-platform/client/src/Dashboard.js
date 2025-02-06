import React, { useState } from 'react';
import EnhancedTranscript from './components/EnhancedTranscript';
import RegulatorySidebar from './components/RegulatorySidebar';
import RecordingControls from './RecordingControls';

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [regulatoryAnswers, setRegulatoryAnswers] = useState({});

  const handleStart = () => setIsRecording(true);
  const handleUpload = () => console.log("העלה הקלטה נלחץ");
  const handleSummary = () => console.log("סיכום ופעולות נלחץ");

  const handleRegulatoryAnswer = (questionId, answer, timestamp, transcriptTime) => {
    setRegulatoryAnswers(prev => ({
      ...prev,
      [questionId]: { answer, timestamp, transcriptTime }
    }));
  };

  return (
    <div className="flex gap-6">
      <RegulatorySidebar 
        onAnswerUpdate={handleRegulatoryAnswer}
      />
      
      <div className="flex-1 space-y-6">
        <section className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-semibold text-finance-300 mb-6 border-b border-stone-200 pb-3">
            תמלול שיחה בשידור חי
          </h3>
          <EnhancedTranscript 
            isRecording={isRecording}
            onTranscriptUpdate={() => {}}
            regulatoryAnswers={regulatoryAnswers}
          />
        </section>

        <aside className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
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
