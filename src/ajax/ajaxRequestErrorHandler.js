import Logger from "../logger/logger";

export const getFunctionName = (d) => {
  // d: 0=this function 1=caller 2=caller of caller  ...
  const error = new Error();
  const firefoxMatch = (error.stack.split("\n")[0 + d].match(/^.*(?=@)/) ||
    [])[0];
  const chromeMatch = (
    (((error.stack.split("at ") || [])[1 + d] || "").match(
      /(^|\.| <| )(.*[^(<])( \()/,
    ) || [])[2] || ""
  )
    .split(".")
    .pop();
  const safariMatch = error.stack.split("\n")[0 + d];

  // firefoxMatch ? console.log('firefoxMatch', firefoxMatch) : void 0;
  // chromeMatch ? console.log('chromeMatch', chromeMatch) : void 0;
  // safariMatch ? console.log('safariMatch', safariMatch) : void 0;

  return firefoxMatch || chromeMatch || safariMatch;
};

export const ajaxRequestErrorHandler = (
  httpStatus,
  viewName,
  setAlertOptions,
  setAlertOpen,
) => {
  Logger.logPrefix = viewName;
  const callerFuncName = getFunctionName(2);

  switch (httpStatus) {
    case 401:
      Logger.error(`${callerFuncName}: No valid login token.`);
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Please login with your email and password!",
      });
      break;

    case 403:
      Logger.error(`${callerFuncName}: No required role.`);
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Sorry, You don't have the needed role to do this!",
      });
      break;

    default:
      Logger.error(`${callerFuncName}: failed to do the ajax action`);
      setAlertOptions({
        severity: "error",
        title: "Error",
        message:
          "Oops! Something went wrong on the server. No server action completed.",
      });
      break;
  }
  setAlertOpen(true);
  return;
};
