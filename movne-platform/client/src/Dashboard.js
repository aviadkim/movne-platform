import React, { useState, useEffect } from 'react';
import RegulatorySidebar from './components/RegulatorySidebar';
import EnhancedTranscript from './components/EnhancedTranscript';
import RecordingControls from './components/RecordingControls';

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [summary, setSummary] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [regulatoryAnswers, setRegulatoryAnswers] = useState({});

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'he-IL';
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        handleTranscriptChange({
          text: transcript,
          speaker: 'detecting...',
          timestamp: new Date().toLocaleTimeString()
        });
      };

      setRecognition(recognition);
    }
  }, []);

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(prev => [...prev, newTranscript]);
  };

  const handleStart = () => {
    setIsRecording(true);
    recognition?.start();
  };

  const handleStop = () => {
    setIsRecording(false);
    recognition?.stop();
  };

  const handleUpload = (file) => {
    if (file) {
      console.log("File uploaded:", file.name);
    }
  };

  const handleSummary = () => {
    setSummary("Generated summary will appear here");
  };

  const handleSendEmail = (type) => {
    console.log(`Sending ${type} email`);
  };

  useEffect(() => {
    if (regulatoryAnswers && Object.keys(regulatoryAnswers).length > 0) {
      handleSummary(); // Use handleSummary when regulatory answers change
    }
  }, [regulatoryAnswers]);

  return (
    <div className="grid grid-cols-12 gap-3 p-2 h-screen">
      <div className="col-span-2 h-full">
        <RegulatorySidebar onAnswerUpdate={setRegulatoryAnswers} />
      </div>

      <div className="col-span-8 h-full flex flex-col">
        <section className="flex-1 bg-white rounded-xl shadow-lg border border-stone-200 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <h3 className="text-xl font-semibold text-finance-300">
              תמלול שיחה בשידור חי
            </h3>
            <RecordingControls 
              isRecording={isRecording}
              onStart={handleStart}
              onStop={handleStop}
              onUpload={handleUpload}
            />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <EnhancedTranscript 
              isRecording={isRecording}
              transcript={transcript}
              onTranscriptUpdate={handleTranscriptChange}
              className="h-full"
            />
          </div>
        </section>
      </div>

      <div className="col-span-2 h-full flex flex-col gap-3">
        <section className="flex-1 bg-white rounded-xl shadow-lg p-4 border border-stone-200">
          <h3 className="text-lg font-semibold text-finance-300 mb-4">סיכום שיחה</h3>
          <textarea
            className="w-full h-[calc(100%-8rem)] p-3 border border-stone-200 rounded-lg resize-none"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="סיכום אוטומטי יופיע כאן..."
            dir="rtl"
          />
          <div className="mt-4 space-y-2">
            <button 
              onClick={() => handleSendEmail('client')}
              className="w-full py-2 text-sm bg-trust-400 text-white rounded-lg hover:bg-trust-500 transition-all duration-300"
            >
              שלח מייל ללקוח
            </button>
            <button 
              onClick={() => handleSendEmail('advisor')}
              className="w-full py-2 text-sm bg-finance-300 text-white rounded-lg hover:bg-finance-400 transition-all duration-300"
            >
              שלח מייל למשווק
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
