export class RecordingService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.startTime = null;
    this.duration = 0;
    this.interval = null;
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.startTime = new Date();
      
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
      this.startDurationTimer();

      return true;
    } catch (error) {
      console.error('Error starting recording:', error);
      return false;
    }
  }

  stopRecording() {
    return new Promise((resolve) => {
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        this.clearDurationTimer();
        
        const recordingData = {
          blob: audioBlob,
          url: audioUrl,
          duration: this.duration,
          timestamp: new Date().toISOString(),
          size: audioBlob.size
        };

        this.saveRecording(recordingData);
        resolve(recordingData);
      };

      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    });
  }

  startDurationTimer() {
    this.interval = setInterval(() => {
      this.duration = Math.floor((new Date() - this.startTime) / 1000);
      window.dispatchEvent(new CustomEvent('recordingDurationUpdate', {
        detail: { duration: this.duration }
      }));
    }, 1000);
  }

  clearDurationTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  async saveRecording(recordingData) {
    const db = await this.openDB();
    const tx = db.transaction('recordings', 'readwrite');
    const store = tx.objectStore('recordings');
    await store.add({
      ...recordingData,
      id: new Date().getTime()
    });
  }

  async getRecordings() {
    const db = await this.openDB();
    const tx = db.transaction('recordings', 'readonly');
    const store = tx.objectStore('recordings');
    return store.getAll();
  }

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('movneDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('recordings')) {
          db.createObjectStore('recordings', { keyPath: 'id' });
        }
      };
    });
  }
}
