// client/src/Conversations.js
import React from 'react';
import AudioRecorder from './AudioRecorder';
import RecordingControls from './RecordingControls';
import TranscriptViewer from './TranscriptViewer';
import SummaryAndActions from './SummaryAndActions';
import NeedsQuestionnaire from './NeedsQuestionnaire';
import TestPanel from './TestPanel';  // ייבוא הרכיב החדש

function Conversations() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">מודול שיחות</h2>
      <TestPanel />  {/* הצגת כפתור הבדיקה */}
      <AudioRecorder />
      <RecordingControls />
      <TranscriptViewer />
      <SummaryAndActions />
      <NeedsQuestionnaire />
    </div>
  );
}

export default Conversations;
