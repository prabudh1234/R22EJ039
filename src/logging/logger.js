// Simple logger implementation
export const logger = {
  logs: [],
  add(type, message, data) {
    this.logs.push({
      type,
      message,
      time: new Date().toLocaleTimeString(),
      data,
    });
  },
  getAll() {
    return this.logs;
  },
};
