import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { useContext, useState } from "react";
import { CSVLink } from "react-csv";
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
  const fileName = "Allocation-Report";
  const fileNamePlanner = "Allocation-Report-Department";
  const [reportData, setReportData] = useState([]);
  const [plannerData, setPlannerData] = useState([]);
  const headers = [
    { label: "Department", key: "department" },
    { label: "Program", key: "program" },
    { label: "Lesson", key: "lesson" },
    { label: "Room", key: "room" },
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

  const getReportData = async () => {
    const { success, data } = await dao.fetchReportData();
    console.log(success);
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message:
          "Something went wrong with report data - please try again later.",
      });

      return;
    }

    setReportData(data);
    console.log(data);
  };

  const getPlannerData = async () => {
    const { success, data } = await dao.fetchPlannerData();
    console.log(success);
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message:
          "Something went wrong with report data - please try again later.",
      });

      return;
    }

    setPlannerData(data);
    console.log(data);
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
        style={{ color: theme.palette.primary.contrastText }}
        onClick={() => {
          allocationPost.startAlloc(allocRoundContext.allocRoundId);
          setDelayedClickedToggle();
          getReportData();
          getPlannerData();
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
          getReportData();
          getPlannerData();
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
      >
        <CSVLink
          headers={headers}
          data={reportData}
          filename={fileName}
          separator={";"}
          style={{ textDecoration: "none", color: "inherit" }}
          disabled={!isClicked}
        >
          Download full report
        </CSVLink>
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        disabled={!isClicked}
      >
        <CSVLink
          headers={headers}
          data={plannerData}
          filename={fileNamePlanner}
          style={{ textDecoration: "none", color: "inherit" }}
          disabled={!isClicked}
        >
          Download Planner report
        </CSVLink>
      </Button>
    </Typography>
  );
}
