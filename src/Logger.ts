class Logger {
  error(...args: any[]) {
    console.error(`error - `, ...args);
  }
  log(...args: any[]) {
    console.log(...args);
  }
}
export default new Logger();
