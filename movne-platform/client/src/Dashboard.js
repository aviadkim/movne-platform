import React, { useState, useEffect } from 'react';
import RegulatorySidebar from './components/RegulatorySidebar';
import EnhancedTranscript from './components/EnhancedTranscript';
// eslint-disable-next-line no-unused-vars
import RecordingControls from './components/RecordingControls';

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [summary, setSummary] = useState('');
  const [recognition, setRecognition] = useState(null);
  // eslint-disable-next-line no-unused-vars
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

  const handleStart = () => {
    setIsRecording(true);
    recognition?.start();
  };

  const handleStop = () => {
    setIsRecording(false);
    recognition?.stop();
  };

  const handleUpload = (file) => {
    console.log("Uploading file:", file);
  };

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(prev => [...prev, newTranscript]);
  };

  const handleSummary = () => {
    setSummary("Generated summary will appear here");
  };

  const handleSendEmail = (type) => {
    console.log(`Sending ${type} email`);
  };

  return (
    <div className="grid grid-cols-12 gap-3 p-2 h-screen">
      {/* Regulatory Sidebar - Narrower */}
      <div className="col-span-2 h-full">
        <RegulatorySidebar onAnswerUpdate={setRegulatoryAnswers} />
      </div>

      {/* Main Transcript Area - Wider */}
      <div className="col-span-8 h-full flex flex-col">
        <section className="flex-1 bg-white rounded-xl shadow-lg border border-stone-200 flex flex-col">
          {/* Controls at Top */}
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <h3 className="text-xl font-semibold text-finance-300">
              תמלול שיחה בשידור חי
            </h3>
            <div className="flex gap-3">
              <button
                onClick={isRecording ? handleStop : handleStart}
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
                  onChange={(e) => handleUpload(e.target.files[0])}
                  className="hidden" 
                />
              </label>
              
              <button
                onClick={handleSummary}
                className="px-4 py-2 bg-finance-300 text-white rounded-lg hover:bg-finance-400 
                         transition-all duration-300 text-sm"
              >
                סיכום ופעולות
              </button>
            </div>
          </div>
          
          {/* Expanded Transcript Area */}
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

      {/* Summary Area - Narrower */}
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
