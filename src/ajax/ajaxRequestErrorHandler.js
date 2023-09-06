export const ajaxRequestErrorHandler = (
  httpStatus,
  methodName,
  setAlertOptions,
  setAlertOpen,
) => {
  switch (httpStatus) {
    case 401:
      Logger.error(`${methodName}: No valid login token.`);
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Please login with your email and password!",
      });
      break;

    case 403:
      Logger.error(`${methodName}: No required role.`);
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Sorry, You don't have the needed role to do this!",
      });
      break;

    default:
      Logger.error(`${methodName}: failed to do the ajax action`);
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
