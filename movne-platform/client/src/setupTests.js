// Mock for SpeechRecognition to prevent Web Speech API warnings in tests
class MockSpeechRecognition {
  constructor() {
    this.continuous = true;
    this.interimResults = false;
    this.lang = 'he-IL';
    this.onresult = null;
    this.onerror = null;
  }
  start() {
    if (this.onresult) {
      const event = {
        resultIndex: 0,
        results: [
          { isFinal: true, 0: { transcript: "שלום, איך אפשר לעזור?" } }
        ]
      };
      this.onresult(event);
    }
  }
  stop() {}
}

global.SpeechRecognition = MockSpeechRecognition;
global.webkitSpeechRecognition = MockSpeechRecognition;
