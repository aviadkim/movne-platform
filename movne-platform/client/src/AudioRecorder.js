import React, { useState, useRef } from 'react';
import './AudioRecorder.css';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    setTranscript('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setRecording(true);
      audioChunksRef.current = [];
      mediaRecorderRef.current.addEventListener('dataavailable', event => {
        audioChunksRef.current.push(event.data);
      });
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setTranscript('תמלול לדוגמה: השיחה הוקלטה בהצלחה.');
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="audio-recorder bg-blue-50 p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">הקלטת שיחה</h3>
      {!recording ? (
        <button onClick={startRecording} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          התחל הקלטה
        </button>
      ) : (
        <button onClick={stopRecording} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          עצור הקלטה
        </button>
      )}
      {audioURL && (
        <div className="mt-4">
          <h4 className="text-lg font-medium">הקלטה:</h4>
          <audio src={audioURL} controls className="w-full mt-2" />
        </div>
      )}
      {transcript && (
        <div className="mt-4">
          <h4 className="text-lg font-medium">תמלול:</h4>
          <p className="text-gray-800">{transcript}</p>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
