import * as ExcelJS from "exceljs";
import dao from "../ajax/dao";

export const getPlannerData = async (
  allocRoundId,
  sheetcolumns,
  saveAs,
  setAlertOptions,
) => {
  const { success, data } = await dao.fetchPlannerData(allocRoundId);
  if (!success) {
    setAlertOptions({
      severity: "error",
      title: "Error",
      message:
        "Something went wrong with report data - please try again later.",
    });

    return;
  }
  const plannerReport = new ExcelJS.Workbook();
  const plannersheet = plannerReport.addWorksheet("Planner");
  plannersheet.columns = sheetcolumns;

  for (const row of data) {
    plannersheet.addRow(row);
  }

  plannersheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const buffer = await plannerReport.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.sreadsheetml.sheet";
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    const today = new Date();
    const currDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}-${today.getHours()}.${today.getMinutes()}`;

    saveAs(blob, `Your-Planner-Report-${currDate}${fileExtension}`);
    plannerReport.removeWorksheet(plannersheet.id);
  } catch (err) {
    console.log(`Could not download report: ${err}`);
    plannerReport.removeWorksheet(plannersheet.id);
  }
};
