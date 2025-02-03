// client/src/TestPanel.js
import React from 'react';

function TestPanel() {
  const testAudioRecorder = () => {
    alert("בדיקה: AudioRecorder - התחלת הקלטה (alert לדוגמה)");
  };

  const testRecordingControls = () => {
    alert("בדיקה: RecordingControls - כפתורי בדיקה (alert לדוגמה)");
  };

  const testTranscriptViewer = () => {
    alert("בדיקה: TranscriptViewer - מציג תמלול לדוגמה");
  };

  const testSummaryAndActions = () => {
    alert("בדיקה: SummaryAndActions - כפתורי שליחת מייל (alert לדוגמה)");
  };

  const testNeedsQuestionnaire = () => {
    alert("בדיקה: NeedsQuestionnaire - טופס שאלון (alert לדוגמה)");
  };

  const runAllTests = () => {
    testAudioRecorder();
    testRecordingControls();
    testTranscriptViewer();
    testSummaryAndActions();
    testNeedsQuestionnaire();
    alert("כל הבדיקות רצו (בדיקה מדומה)!");
  };

  return (
    <div className="test-panel p-4 bg-gray-100 border rounded mb-4">
      <h3 className="text-xl font-bold mb-2">Test Panel</h3>
      <button
        onClick={runAllTests}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        בדוק את כל הפונקציות
      </button>
    </div>
  );
}

export default TestPanel;
