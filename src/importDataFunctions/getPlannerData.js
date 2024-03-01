const getPlannerData = async (allocRoundId, sheetcolumns, plannerReport) => {
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

    saveAs(blob, `Your-Allocated-Lessons${fileExtension}`);
    plannerReport.removeWorksheet(plannersheet.id);
  } catch (err) {
    console.log(`Could not download report: ${err}`);
    plannerReport.removeWorksheet(plannersheet.id);
  }
};
