class Logger {
  error(...args: any[]) {
    console.log(`error - `, ...args);
  }
}
export default new Logger();
