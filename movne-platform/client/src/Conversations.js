// client/src/Conversations.js
import React from 'react';
import AudioRecorder from './AudioRecorder';
import RecordingControls from './RecordingControls';
import TranscriptViewer from './TranscriptViewer';
import SummaryAndActions from './SummaryAndActions';
import NeedsQuestionnaire from './NeedsQuestionnaire';
import LiveTranscript from './LiveTranscript';
import RegulatoryQuestions from './RegulatoryQuestions';

function Conversations() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">מודול שיחות</h2>
      <AudioRecorder />
      <RecordingControls />
      {/* ניתן לבחור להשתמש או לא ב-TranscriptViewer אם רוצים לראות גם תמלול סטטי */}
      <LiveTranscript />
      <TranscriptViewer />
      <SummaryAndActions />
      <NeedsQuestionnaire />
      <RegulatoryQuestions />
    </div>
  );
}

export default Conversations;
