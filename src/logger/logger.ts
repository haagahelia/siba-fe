import { DateTime } from "luxon";

const Logger = {
  // The level of the logs that should be displayed.
  // Available options are: "debug", "info", "warn", "error".
  logLevel: "debug", // "debug","info","warn"
  loggedEnv: "development", // "development". Others mean "no logging"

  // A prefix that will be prepended to all log messages.
  // Should be set in the view logger is used in.
  logPrefix: "CustomLogger",
  getFormattedTimestamp() {
    const time = DateTime.now();
    return time.toFormat("yyyyMMdd HH:mm:ss");
  },

  debug(...params: unknown[]) {
    if (
      import.meta.env.VITE_MODE === this.loggedEnv &&
      this.logLevel === "debug"
    ) {
      console.log(
        `DEBU|${this.getFormattedTimestamp()}[${this.logPrefix}]`,
        ...params,
      );
      //console.log("HEI DEBUG 1");
    }
    //console.log("HEI DEBUG 2");
  },

  info(...params: unknown[]) {
    if (
      import.meta.env.VITE_MODE === this.loggedEnv &&
      ["debug", "info"].includes(this.logLevel)
    ) {
      console.info(
        `INFO|${this.getFormattedTimestamp()}[${this.logPrefix}]`,
        ...params,
      );
      // console.log("HEI INFO 1");
    }
    // console.log("HEI INFO 2");
  },

  warn(...params: unknown[]) {
    if (
      import.meta.env.VITE_MODE === this.loggedEnv &&
      ["debug", "info", "warn"].includes(this.logLevel)
    ) {
      console.warn(
        `WARN|${this.getFormattedTimestamp()}[${this.logPrefix}]`,
        ...params,
      );
    }
  },

  error(...params: unknown[]) {
    if (import.meta.env.VITE_MODE === this.loggedEnv) {
      console.error(
        `ERRO|${this.getFormattedTimestamp()}[${this.logPrefix}]`,
        ...params,
      );
    }
  },
};

export default Logger;
