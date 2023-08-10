import { DateTime } from "luxon";

const Logger = {
  // The level of the logs that should be displayed.
  // Available options are: "debug", "info", "warn", "error".
  logLevel: "debug",

  // A prefix that will be prepended to all log messages. Should be set in the view logger is used in.
  logPrefix: "CustomLogger",
  getFormattedTimestamp() {
    let time = new DateTime({});
    return time.toFormat("yyyyMMdd HH:mm:ss");
  },

  debug(...params) {
    if (process.env.NODE_ENV === "development" && this.logLevel === "debug") {
      console.log(
        `DEBU|${this.getFormattedTimestamp()}[${this.logPrefix}]`,
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
        `INFO|${this.getFormattedTimestamp()}[${this.logPrefix}]`,
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
        `WARN|${this.getFormattedTimestamp()}[${this.logPrefix}]`,
        ...params,
      );
    }
  },

  error(...params) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `ERRO|${this.getFormattedTimestamp()}[${this.logPrefix}]`,
        ...params,
      );
    }
  },
};

export default Logger;
