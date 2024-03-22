import * as ExcelJS from "exceljs";
import dao from "../ajax/dao";

export const getReportData = async (
  allocRoundId,
  sheetcolumns,
  saveAs,
  setAlertOptions,
) => {
  const { success, data } = await dao.fetchReportData(allocRoundId);
  if (!success) {
    setAlertOptions({
      severity: "error",
      title: "Error",
      message:
        "Something went wrong with report data - please try again later.",
    });

    return;
  }
  const report = new ExcelJS.Workbook();
  const reportsheet = report.addWorksheet("Report");
  reportsheet.columns = sheetcolumns;

  for (const row of data) {
    reportsheet.addRow(row);
  }

  reportsheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const buffer = await report.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.sreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    const today = new Date();
    const currDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}-${today.getHours()}.${today.getMinutes()}`;

    saveAs(blob, `Allocation-Report${currDate}${fileExtension}`);
    report.removeWorksheet(reportsheet.id);
  } catch (err) {
    console.log(`Could not download report: ${err}`);
    report.removeWorksheet(reportsheet.id);
  }
};
