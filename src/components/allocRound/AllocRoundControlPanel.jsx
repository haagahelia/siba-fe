import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import * as ExcelJS from "Exceljs";
import { saveAs } from "file-saver";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AllocRoundContext } from "../../AppContext";
import dao from "../../ajax/dao";
import allocationPost from "../../data/ResultAllocationStore";
import AlertBox from "../common/AlertBox";

export default function AllocRoundControlPanel({ incrementResetCounter }) {
  const { allocRoundContext } = useContext(AllocRoundContext);
  // console.log("appContext 123: " + appContext);

  const theme = useTheme();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const [isClicked, setIsClicked] = useState(true);
  const report = new ExcelJS.Workbook();
  const plannerReport = new ExcelJS.Workbook();
  const sheetcolumns = [
    { header: "Department", key: "department", width: 35, height: 20 },
    { header: "Program", key: "program", width: 45, height: 20 },
    { header: "Lesson", key: "lesson", width: 53, height: 20 },
    { header: "Room", key: "room", width: 35, height: 20 },
  ];

  const setDelayedClickedToggle = () => {
    setTimeout(() => {
      if (!isClicked) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
      incrementResetCounter();
    }, 3000);
  };

  const getReportData = async (allocRoundId) => {
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

  const getPlannerData = async (allocRoundId) => {
    const { success, data } = await dao.fetchPlannerData(allocRoundId);

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

  return (
    <Typography component="p" variant="allocRoundControlPanel">
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      Allocation {allocRoundContext.allocRoundId}&nbsp;:&nbsp;
      {allocRoundContext.allocRoundName} &nbsp; - &nbsp;After 'Start' or 'Reset'
      wait for a few seconds
      <br />
      <Button
        type="submit"
        variant="contained"
        onClick={() => {
          allocationPost.startAlloc(allocRoundContext.allocRoundId);
          setDelayedClickedToggle();
        }}
        disabled={isClicked}
      >
        Start Allocation
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="red"
        onClick={() => {
          allocationPost.resetAlloc(allocRoundContext.allocRoundId);
          setDelayedClickedToggle();
        }}
        disabled={!isClicked}
      >
        Reset Allocation
      </Button>
      <Link
        to={isClicked ? `/alloc-fail/${allocRoundContext.allocRoundId}` : ""}
        disabled={!isClicked}
      >
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          disabled={!isClicked}
        >
          Show failed allocation
        </Button>
      </Link>
      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        disabled={!isClicked}
        onClick={() => {
          getReportData(allocRoundContext.allocRoundId);
          //downloadReport();
        }}
      >
        Download full report
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        disabled={!isClicked}
        onClick={() => {
          getPlannerData(allocRoundContext.allocRoundId);
        }}
      >
        Download Planner report
      </Button>
    </Typography>
  );
}
