import Papa from "papaparse";

export const exportData = async (
  dataFailedToImport,
  setAlertOpen,
  setAlertOptions,
) => {
  if (dataFailedToImport.length === 0) {
    setAlertOptions({
      severity: "info",
      title: "Export data info",
      message: "There is no data to export.",
    });
    setAlertOpen(true);
  } else {
    const csv = Papa.unparse(dataFailedToImport);
    const blob = new Blob([csv]);
    const a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "DataFailedToImport.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
