import { blue } from "@mui/material/colors";
import * as ExcelJS from "exceljs";
import dao from "../ajax/dao";

export const getFullReport = async (sheetcolumns, saveAs, setAlertOptions) => {
  const { success, data } = await dao.fetchFullReportData();
  if (!success) {
    setAlertOptions({
      severity: "error",
      title: "Error",
      message:
        "Something went wrong with report data - please try again later.",
    });

    return;
  }
  const fullReport = new ExcelJS.Workbook();
  const reportsheet = fullReport.addWorksheet("Report");
  reportsheet.columns = sheetcolumns;

  for (const row of data) {
    reportsheet.addRow(row);
  }

  reportsheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "82b1ff" } };
  });
  try {
    const buffer = await fullReport.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.sreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    const today = new Date();
    const currDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}-${today.getHours()}.${today.getMinutes()}`;

    saveAs(blob, `Full-Report${currDate}${fileExtension}`);
    fullReport.removeWorksheet(reportsheet.id);
  } catch (err) {
    console.log(`Could not download report: ${err}`);
    fullReport.removeWorksheet(reportsheet.id);
  }
};
