const Logger = {
  // The level of the logs that should be displayed.
  // Available options are: "debug", "info", "warn", "error".
  logLevel: "debug",

  // A prefix that will be prepended to all log messages. Should be set in the view logger is used in.
  logPrefix: "CustomLogger",
  getFormattedTimestamp() {
    let now = new Date();
    // converting to Finnish time
    let offset = now.getTimezoneOffset() + 6 * 60;
    let finnishTime = new Date(now.getTime() + offset * 60 * 1000);
    return finnishTime.toISOString();
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
