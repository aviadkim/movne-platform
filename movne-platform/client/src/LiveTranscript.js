// client/src/LiveTranscript.js
import React, { useState, useEffect } from 'react';

// הגדרת simulatedLines מחוץ ל-useEffect
const simulatedLines = [
  "[08:30] היועץ: שלום, איך אפשר לעזור?",
  "[08:31] הלקוח: אני מעוניין לעדכן את תיק ההשקעות שלי.",
  "[08:32] היועץ: מצוין, נעבור על הפרטים.",
  "[08:33] היועץ: האם יש לך שאלות נוספות?"
];

function LiveTranscript() {
  const [transcript, setTranscript] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranscript(prev => prev + (prev ? "\n" : "") + simulatedLines[currentLineIndex]);
      setCurrentLineIndex(prevIndex => (prevIndex + 1) % simulatedLines.length);
    }, 5000); // עדכון כל 5 שניות
    return () => clearInterval(interval);
  }, [currentLineIndex]); // אין צורך להוסיף simulatedLines כאן כיוון שהוא קבוע

  return (
    <div className="live-transcript bg-gray-100 p-4 border rounded mt-4">
      <h3 className="text-lg font-medium mb-2">תמלול בשידור חי</h3>
      <pre className="font-mono whitespace-pre-wrap">{transcript}</pre>
    </div>
  );
}

export default LiveTranscript;
