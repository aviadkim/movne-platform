// client/src/Conversations.js
import React from 'react';
import AudioRecorder from './AudioRecorder';
import RecordingControls from './RecordingControls';
import TranscriptViewer from './TranscriptViewer';
import SummaryAndActions from './SummaryAndActions';
import NeedsQuestionnaire from './NeedsQuestionnaire';
import LiveTranscript from './LiveTranscript';
import RegulatoryQuestions from './RegulatoryQuestions';
import TestPanel from './TestPanel'; // יבוא הרכיב

function Conversations() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">מודול שיחות</h2>
      <TestPanel /> {/* כפתור בדיקה */}
      <AudioRecorder />
      <RecordingControls />
      <LiveTranscript />
      <TranscriptViewer />
      <SummaryAndActions />
      <NeedsQuestionnaire />
      <RegulatoryQuestions />
    </div>
  );
}

export default Conversations;
