import '@testing-library/jest-dom';

// Mock Web Speech API
window.webkitSpeechRecognition = jest.fn().mockImplementation(() => ({
  continuous: false,
  interimResults: false,
  start: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

// Mock IndexedDB
const indexedDB = {
  open: jest.fn(),
  deleteDatabase: jest.fn()
};

window.indexedDB = indexedDB;
