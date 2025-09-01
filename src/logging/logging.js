class Logger {
  constructor() {
    this.entries = [];
  }

  add(type, message, details) {
    const entry = {
      time: new Date().toLocaleTimeString(),
      type,
      message,
      details
    };
    this.entries.push(entry);
  }

  getAll() {
    return [...this.entries];
  }
}

export const logger = new Logger();
