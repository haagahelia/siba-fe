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

  const itemsPerPageVariable = settings.find(
    (setting) =>
      setting?.variable?.toLowerCase() === "items-per-page".toLowerCase(),
  );
  if (itemsPerPageVariable) {
    appContext.settings.itemsPerPage = itemsPerPageVariable.numberValue;
    Logger.debug("items-per-page setting found");
  }

  const spaceUnderUsageVariable = settings.find(
    (setting) =>
      setting?.variable?.toLowerCase() === "spaceUnderUsage".toLowerCase(),
  );
  if (spaceUnderUsageVariable) {
    appContext.settings.spaceUnderUsage = spaceUnderUsageVariable.numberValue;
    Logger.debug("spaceUnderUsage setting found");
  }

  const spaceOverUsageVariable = settings.find(
    (setting) =>
      setting?.variable?.toLowerCase() === "spaceOverUsage".toLowerCase(),
  );
  if (spaceOverUsageVariable) {
    appContext.settings.spaceOverUsage = spaceOverUsageVariable.numberValue;
    Logger.debug("spaceOverUsage setting found");
  }
};
