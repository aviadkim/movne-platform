// client/src/LiveTranscript.js
import React, { useState, useEffect } from 'react';

function LiveTranscript() {
  const [transcript, setTranscript] = useState('');
  const simulatedLines = [
    "[08:30] היועץ: שלום, איך אפשר לעזור?",
    "[08:31] הלקוח: אני מעוניין לעדכן את תיק ההשקעות שלי.",
    "[08:32] היועץ: מצוין, נעבור על הפרטים.",
    "[08:33] היועץ: האם יש לך שאלות נוספות?"
  ];
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranscript(prev => prev + (prev ? "\n" : "") + simulatedLines[currentLineIndex]);
      setCurrentLineIndex((prev) => (prev + 1) % simulatedLines.length);
    }, 5000); // כל 5 שניות
    return () => clearInterval(interval);
  }, [currentLineIndex]); // Note: תלוי במנגנון – ניתן לשנות ליצירת אפקט רציף

  return (
    <div className="live-transcript bg-gray-100 p-4 border rounded mt-4">
      <h3 className="text-lg font-medium mb-2">תמלול בשידור חי</h3>
      <pre className="font-mono whitespace-pre-wrap">{transcript}</pre>
    </div>
  );
}

export default LiveTranscript;
