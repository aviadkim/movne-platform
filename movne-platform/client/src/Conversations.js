import React from 'react';
import AudioRecorder from './AudioRecorder';
import RecordingControls from './RecordingControls';
import TranscriptViewer from './TranscriptViewer';
import SummaryAndActions from './SummaryAndActions';
import NeedsQuestionnaire from './NeedsQuestionnaire';
import RealTimeTranscript from './RealTimeTranscriptLive';
import RegulatoryQuestions from './RegulatoryQuestions';
import TestPanel from './TestPanel'; // אם יצרת אותו

function Conversations() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">מודול שיחות</h2>
      {/* אם תרצה, תוכל לכלול כאן גם את TestPanel */}
      <AudioRecorder />
      <RecordingControls />
      <RealTimeTranscript />
      <TranscriptViewer />
      <SummaryAndActions />
      <NeedsQuestionnaire />
      <RegulatoryQuestions />
      {/* <TestPanel />  // אפשר להוסיף כפתור בדיקה */}
    </div>
  );
}

export default Conversations;
