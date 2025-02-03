import React from 'react';
import './TranscriptViewer.css';

function TranscriptViewer() {
  const transcript = "[08:30] היועץ: שלום, איך אפשר לעזור?\n[08:31] הלקוח: אני מעוניין לעדכן את תיק ההשקעות שלי.\n[08:32] היועץ: מצוין, נעבור על הפרטים.";
  return (
    <div className="transcript-viewer bg-gray-50 p-4 border rounded mb-4">
      <h3 className="text-lg font-medium mb-2">תמלול השיחה</h3>
      <pre className="font-mono whitespace-pre-wrap">{transcript}</pre>
    </div>
  );
}

export default TranscriptViewer;
