// Using IndexedDB for local storage (free)
export const setupStorage = () => {
  const request = indexedDB.open('movneDB', 1);
  
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('recordings', { keyPath: 'id' });
    db.createObjectStore('transcripts', { keyPath: 'id' });
  };
  
  return request;
};

// Using localStorage for small data (free)
export const cacheData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
