import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { saveAs } from "file-saver";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AllocRoundContext } from "../../AppContext";
import allocationPost from "../../data/ResultAllocationStore";
import { getPlannerData } from "../../importDataFunctions/getPlannerData";
import { getReportData } from "../../importDataFunctions/getReportData";
import AlertBox from "../common/AlertBox";

export default function AllocRoundControlPanel({ incrementResetCounter }) {
  const { allocRoundContext } = useContext(AllocRoundContext);
  // console.log("appContext 123: " + appContext);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const [isClicked, setIsClicked] = useState(true);
  const sheetcolumns = [
    { header: "Allocation ID", key: "allocId", width: 12, height: 20 },
    { header: "Allocation", key: "allocation", width: 9, height: 20 },
    { header: "Allocated on", key: "lastModified", width: 17.89, height: 20 },
    { header: "Department", key: "department", width: 34, height: 20 },
    { header: "Program", key: "program", width: 45, height: 20 },
    { header: "Lesson", key: "lesson", width: 40, height: 20 },
    { header: "Room", key: "room", width: 34, height: 20 },
    { header: "Allocated Hours", key: "hours", width: 20, height: 20 },
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

  return (
    <Typography component="div" variant="allocRoundControlPanel">
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
        className={`redButton ${!isClicked ? "disabledButton" : ""}`}
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
          className="secondaryButton"
          disabled={!isClicked}
        >
          Show failed allocation
        </Button>
      </Link>
      <Button
        type="submit"
        variant="outlined"
        className="secondaryButton"
        disabled={!isClicked}
        onClick={() => {
          getReportData(
            allocRoundContext.allocRoundId,
            sheetcolumns,
            saveAs,
            setAlertOptions,
          );
        }}
      >
        Download full report
      </Button>
      <Button
        type="submit"
        variant="outlined"
        className="secondaryButton"
        disabled={!isClicked}
        onClick={() => {
          getPlannerData(
            allocRoundContext.allocRoundId,
            sheetcolumns,
            saveAs,
            setAlertOptions,
          );
        }}
      >
        Download Planner report
      </Button>
    </Typography>
  );
}
