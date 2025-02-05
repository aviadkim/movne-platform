import React, { useState, useEffect, useRef } from 'react';
import './EnhancedTranscript.css';

const regulatoryQuestions = [
  "האם חל שינוי במצבך הכלכלי?",
  "האם יש צורך בנזילות כספית שונה?",
  "האם אתה מודע לכך שקיימת לי זיקה לנכס זה?"
  // ניתן להוסיף שאלות נוספות
];

function EnhancedTranscript() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [currentSpeaker, setCurrentSpeaker] = useState("Advisor"); // "Advisor" or "Client"
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web Speech API is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false; // מחכים לתוצאות סופיות
    recognition.lang = 'he-IL';

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const text = event.results[i][0].transcript.trim();
          const timestamp = new Date();
          const regulatory = regulatoryQuestions.some(q => text.includes(q));
          const newLine = { text, speaker: currentSpeaker, timestamp, regulatory };
          setTranscript(prev => [...prev, newLine]);
        }
      }
    };

    recognition.onerror = (e) => console.error("Speech recognition error:", e);

    recognitionRef.current = recognition;
  }, [currentSpeaker]);

  const handleStart = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleSpeaker = () => {
    setCurrentSpeaker(prev => prev === "Advisor" ? "Client" : "Advisor");
  };

  return (
    <div className="enhanced-transcript">
      <h3>תמלול שיחה בשידור חי</h3>
      <div className="controls">
        {!isRecording ? (
          <button onClick={handleStart}>התחל הקלטה</button>
        ) : (
          <button onClick={handleStop}>עצור הקלטה</button>
        )}
        <button onClick={toggleSpeaker}>
          מדבר נוכחי: {currentSpeaker === "Advisor" ? "יועץ" : "לקוח"}
        </button>
      </div>
      <div className="transcript-display">
        {transcript.map((line, index) => (
          <div key={index} className={`transcript-line ${line.speaker === "Advisor" ? "advisor" : "client"} ${line.regulatory ? "regulatory" : ""}`}>
            <span className="timestamp">[{line.timestamp.toLocaleTimeString()}]</span>
            <span className="speaker">{line.speaker}:</span>
            <span className="text">{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnhancedTranscript;
