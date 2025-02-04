import React, { useState, useEffect } from 'react';
import './LiveTranscript.css';

function RealTimeTranscriptLive() {
  const [transcript, setTranscript] = useState('');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn("Web Speech API is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'he-IL';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        interimTranscript += result[0].transcript;
      }
      setTranscript(interimTranscript);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
    };

    recognition.start();
    return () => recognition.stop();
  }, []);

  return (
    <div className="live-transcript">
      <h3>תמלול בשידור חי</h3>
      <pre>{transcript}</pre>
    </div>
  );
}

export default RealTimeTranscriptLive;
