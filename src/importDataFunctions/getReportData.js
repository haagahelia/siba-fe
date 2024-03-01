export const getReportData = async (allocRoundId, report, sheetcolumns) => {
  const { success, data } = await dao.fetchReportData(allocRoundId);
  console.log(success);
  console.log(data);
  if (!success) {
    setAlertOptions({
      severity: "error",
      title: "Error",
      message:
        "Something went wrong with report data - please try again later.",
    });

    return;
  }
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

    saveAs(blob, `Allocated-Lessons${fileExtension}`);
    report.removeWorksheet(reportsheet.id);
  } catch (err) {
    console.log(`Could not download report: ${err}`);
    report.removeWorksheet(reportsheet.id);
  }
};
