import dao from "../ajax/dao";
import Logger from "../logger/logger";

export const getSettings = async () => {
  Logger.debug("Fetching settings");

  const { httpStatus, data } = await dao.fetchSettings();
  if (httpStatus !== 200) {
    Logger.error(`Error fetching settings, http status code: ${httpStatus}`);
  }

  return data;
};

// Handles and sets settings used in the app.
export const handleSettings = (settings, appContext) => {
  Logger.debug("Handling settings");

  const itemsPerPage = settings.find(
    (setting) => setting?.variable?.toLowerCase() === "items-per-page",
  );
  if (itemsPerPage) {
    appContext.settings.itemsPerPage = itemsPerPage.numberValue;
    Logger.debug("items-per-page setting found");
  }
};
