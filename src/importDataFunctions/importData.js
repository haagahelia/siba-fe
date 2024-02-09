import Logger from "../logger/logger";

export const importData = async (
  dataToImport,
  dataFailedToImport,
  setDataFailedToImport,
  getAllData,
  processData,
  sendDataToImport,
  setAlertOpen,
  setAlertOptions,
) => {
  let successCount = 0;
  let failedCount = 0;
  const tempFailedData = [];
  const dataToSend = [];
  const dataSet = new Set();

  for (const element of dataToImport) {
    const processedData = await processData(element, dataSet);

    if (processedData.FailedReason) {
      tempFailedData.push(processedData);
      failedCount++;
    } else {
      dataToSend.push(processedData);
      successCount++;
    }
  }

  setDataFailedToImport([...dataFailedToImport, ...tempFailedData]);
  Logger.debug("failed data", tempFailedData);

  // if the data is empty or invalid after validation, not sending to backend
  if (successCount === 0 && failedCount === 0) {
    setAlertOptions({
      severity: "info",
      title: "Import data info",
      message: "There is no data to import.",
    });
  } else if (successCount === 0 && failedCount > 0) {
    setAlertOptions({
      severity: "error",
      title: "Error!",
      message: `Something went wrong. ${failedCount} row(s) failed to add.`,
    });
  } else {
    Logger.debug("dataToSend", dataToSend);
    const success = await sendDataToImport(dataToSend);
    if (success) {
      getAllData();
      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${successCount} row(s) added and ${failedCount} row(s) failed to add.`,
      });
    } else {
      setAlertOptions({
        severity: "error",
        title: "Error!",
        message: `Something went wrong. ${
          failedCount + successCount
        } row(s) failed to add.`,
      });
    }
  }
  setAlertOpen(true);
};
