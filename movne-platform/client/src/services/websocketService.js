export class WebSocketService {
  constructor(url = 'ws://127.0.0.1:38397/ws', options = {}) {
    this.url = url;
    this.options = {
      reconnectAttempts: 5,
      reconnectInterval: 2000,
      ...options
    };
    this.ws = null;
    this.reconnectCount = 0;
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectCount = 0;
      };

      this.ws.onclose = () => {
        if (this.reconnectCount < this.options.reconnectAttempts) {
          setTimeout(() => {
            this.reconnectCount++;
            this.connect();
          }, this.options.reconnectInterval);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
