// Using Web Speech API (free, built into browsers)
export const setupSpeechRecognition = () => {
  if (!('webkitSpeechRecognition' in window)) {
    throw new Error('Browser not supported');
  }
  
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'he-IL';
  
  return recognition;
};

// Using MediaRecorder API (free) for audio recording
export const setupRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const audioChunks = [];
  
  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };
  
  return { mediaRecorder, audioChunks };
};
