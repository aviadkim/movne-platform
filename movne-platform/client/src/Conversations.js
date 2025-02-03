import React from 'react';
import AudioRecorder from './AudioRecorder';
import RecordingControls from './RecordingControls';
import TranscriptViewer from './TranscriptViewer';
import SummaryAndActions from './SummaryAndActions';
import NeedsQuestionnaire from './NeedsQuestionnaire';
import LiveTranscript from './LiveTranscript';  // אם יש לך את הרכיב הזה, לפי הקוד הקודם
import RegulatoryQuestions from './RegulatoryQuestions';
import TestPanel from './TestPanel'; // אם יצרת אותו

function Conversations() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">מודול שיחות</h2>
      {/* אם תרצה, תוכל לכלול כאן גם TestPanel */}
      <AudioRecorder />
      <RecordingControls />
      <LiveTranscript />
      <TranscriptViewer />
      <SummaryAndActions />
      <NeedsQuestionnaire />
      <RegulatoryQuestions />
      {/*
      <TestPanel />  // אפשר להוסיף כפתור בדיקה
      */}
    </div>
  );
}

export default Conversations;
