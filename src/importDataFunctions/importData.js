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

  // if the data is empty after validation, not sending to backend
  if (dataToSend.length === 0) {
    setAlertOptions({
      severity: "error",
      title: "Error!",
      message: `Something went wrong with the import. ${failedCount} row(s) failed to add.`,
    });
    setAlertOpen(true);
  } else {
    Logger.debug("dataToSend", dataToSend);

    const result = await sendDataToImport(dataToSend);

    if (result) {
      getAllData();

      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${successCount} row(s) added and ${failedCount} row(s) failed to add.`,
      });
      setAlertOpen(true);
    } else {
      setAlertOptions({
        severity: "error",
        title: "Error!",
        message: `Something went wrong in the import. ${
          failedCount + successCount
        } row(s) failed to add.`,
      });
      setAlertOpen(true);
    }
  }
};
