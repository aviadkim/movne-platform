import React, { useState } from 'react';
import RealTimeTranscriptLive from './RealTimeTranscriptLive';
import RegulatoryQuestions from './RegulatoryQuestions';
import RecordingControls from './RecordingControls';

const Dashboard = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleStart = () => setIsRecording(true);
  const handleUpload = () => console.log("העלה הקלטה נלחץ");
  const handleSummary = () => console.log("סיכום ופעולות נלחץ");

  const actionButtons = [
    "שאלות רגולטוריות",
    "עדכון פרטים אישיים וצרכים",
    "מתן המלצות השקעה",
    "תיעוד שיחה"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <section className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-semibold text-finance-300 mb-6 border-b border-stone-200 pb-3">
            תמלול שיחה בשידור חי
          </h3>
          <div className="bg-finance-50 rounded-lg p-4">
            <RealTimeTranscriptLive onTranscriptUpdate={setTranscript} />
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            {actionButtons.map((text, index) => (
              <button
                key={index}
                className="p-4 bg-finance-50 text-finance-300 rounded-lg border border-stone-200
                         hover:bg-trust-400 hover:text-white transition-all duration-300
                         flex items-center justify-center text-center min-h-[60px]"
              >
                {text}
              </button>
            ))}
          </div>
        </section>
      </div>

      <aside className="bg-white rounded-xl shadow-lg p-6 h-fit lg:sticky lg:top-32 border border-stone-200">
        <div className="space-y-4">
          <button className="w-full py-3 px-4 bg-trust-400 text-white rounded-lg 
                           hover:bg-finance-400 transition-all duration-300 
                           shadow-md hover:shadow-lg">
            שלח מייל ליועץ
          </button>
          <button className="w-full py-3 px-4 bg-trust-500 text-white rounded-lg 
                           hover:bg-finance-400 transition-all duration-300 
                           shadow-md hover:shadow-lg">
            שלח מייל ללקוח
          </button>
        </div>
        
        <div className="mt-6">
          <RecordingControls 
            isRecording={isRecording}
            onStart={handleStart}
            onUpload={handleUpload}
            onSummary={handleSummary}
          />
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
