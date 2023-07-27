const Logger = {
  logLevel: "debug",
  logPrefix: "CustomLogger",

  getFormattedTimestamp() {
    return new Date().toISOString();
  },

  debug(...params) {
    if (process.env.NODE_ENV === "development" && this.logLevel === "debug") {
      console.log(
        `[${this.getFormattedTimestamp()}] [${this.logPrefix}] [DEBUG]`,
        ...params,
      );
    }
  },

  info(...params) {
    if (
      process.env.NODE_ENV === "development" &&
      ["debug", "info"].includes(this.logLevel)
    ) {
      console.info(
        `[${this.getFormattedTimestamp()}] [${this.logPrefix}] [INFO]`,
        ...params,
      );
    }
  },

  warn(...params) {
    if (
      process.env.NODE_ENV === "development" &&
      ["debug", "info", "warn"].includes(this.logLevel)
    ) {
      console.warn(
        `[${this.getFormattedTimestamp()}] [${this.logPrefix}] [WARN]`,
        ...params,
      );
    }
  },

  error(...params) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `[${this.getFormattedTimestamp()}] [${this.logPrefix}] [ERROR]`,
        ...params,
      );
    }
  },
};

export default Logger;
