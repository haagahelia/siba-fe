import Logger from "../logger/logger";

// This code is from: https://stackoverflow.com/questions/2648293/how-to-get-the-function-name-from-within-that-function
// Justine M.
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

export const tidyUpFunctionName = (name) => {
  if (name.includes("/")) {
    let lastIndex = name.lastIndexOf("/");
    name = name.substring(0, lastIndex);

    if (name.includes("/")) {
      lastIndex = name.lastIndexOf("/");
      name = name.substring(lastIndex + 1);
    }
  }
  return name;
};

export const ajaxRequestErrorHandler = (
  httpStatus,
  viewName,
  setAlertOptions,
  setAlertOpen,
) => {
  //viewName = "S/SS/S//S//TestFunctionNameHere/SSS__d><<>|||";
  Logger.logPrefix = tidyUpFunctionName(viewName);
  const callerFuncName = getFunctionName(2);

  switch (httpStatus) {
    case 401:
      Logger.debug(
        `${callerFuncName}: Not authenticated - No valid login token.`,
      );
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Please login with your email and password!",
      });
      break;

    case 403:
      Logger.debug(`${callerFuncName}: Not authorized - No required role.`);
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Sorry, You don't have the needed role to do this!",
      });
      break;

    case 500:
      Logger.error(`${callerFuncName}: Server error.`);
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Sorry, Something went wrong on server",
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
