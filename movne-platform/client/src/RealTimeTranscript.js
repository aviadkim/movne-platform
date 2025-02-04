// movne-platform/movne-platform/client/src/RealTimeTranscript.js
import React, { useState, useEffect } from 'react';
import './LiveTranscript.css';

const simulatedLines = [
  "[08:30] היועץ: שלום, איך אפשר לעזור?",
  "[08:31] הלקוח: אני מעוניין לעדכן את תיק ההשקעות שלי.",
  "[08:32] היועץ: מצוין, נעבור על הפרטים.",
  "[08:33] היועץ: האם יש לך שאלות נוספות?"
];

function RealTimeTranscript() {
  const [transcript, setTranscript] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranscript(prev => prev + (prev ? "\n" : "") + simulatedLines[currentLineIndex]);
      setCurrentLineIndex((prevIndex) => (prevIndex + 1) % simulatedLines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentLineIndex]);

  return (
    <div className="live-transcript">
      <h3>תמלול בשידור חי</h3>
      <pre>{transcript}</pre>
    </div>
  );
}

export default RealTimeTranscript;
