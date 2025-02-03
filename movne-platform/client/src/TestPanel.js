// client/src/TestPanel.js
import React from 'react';

function TestPanel() {
  const runTests = () => {
    // הפעלות בדיקה מדומות
    alert("בדיקה: AudioRecorder - התחלת הקלטה");
    alert("בדיקה: RecordingControls - כפתורים פועלים");
    alert("בדיקה: LiveTranscript - תמלול בשידור חי עובד");
    alert("בדיקה: RegulatoryQuestions - שאלות רגולטוריות מופיעות");
    alert("בדיקה: SummaryAndActions - כפתורי שליחת מייל עובדים");
    alert("בדיקה: NeedsQuestionnaire - טופס שאלון עובד");
    alert("כל הבדיקות פועלות (בדיקה מדומה)!");
  };

  return (
    <div className="test-panel p-4 bg-gray-100 border rounded mb-4">
      <h3 className="text-xl font-bold mb-2">Test Panel</h3>
      <button onClick={runTests} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
        בדוק את כל הפונקציות
      </button>
    </div>
  );
}

export default TestPanel;
