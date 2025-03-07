import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { saveAs } from "file-saver";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllocRoundContext } from "../../AppContext";
import dao from "../../ajax/dao";
import allocationPost from "../../data/ResultAllocationStore";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn.js";
import { getFullReport } from "../../importDataFunctions/getFullReport";
import { getPlannerData } from "../../importDataFunctions/getPlannerData";
import { getReportData } from "../../importDataFunctions/getReportData";
import AlertBox from "../common/AlertBox";

export default function AllocRoundControlPanel({
  incrementResetCounter,
  toggleBarChart,
  showBarChart,
}) {
  const { allocRoundContext } = useContext(AllocRoundContext);
  const { roles } = useRoleLoggedIn();
  // console.log("appContext 123: " + appContext);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const [isClicked, setIsClicked] = useState(true);
  const [allocRound, setAllocRound] = useState(null);
  const sheetcolumns = [
    { header: "Successful", key: "Successful", width: 12, height: 20 },
    { header: "Allocation ID", key: "allocId", width: 12, height: 20 },
    { header: "Allocation", key: "allocation", width: 9, height: 20 },
    {
      header: "Successful Calculation Date",
      key: "lastCalcSuccs",
      width: 17.89,
      height: 20,
    },
    {
      header: "Failed Calculation Date",
      key: "lastCalcFail",
      width: 17.89,
      height: 20,
    },
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

  useEffect(() => {
    // Fetch alloc round by id to make sure is not read only:
    if (allocRoundContext?.allocRoundId) {
      dao
        .fetchAllocRoundById(allocRoundContext?.allocRoundId)
        .then((response) => {
          if (!response.success) {
            Logger.error("Error fetching allocation rounds");
            setAlertOptions({
              severity: "error",
              title: "Error",
              message:
                "Oops! Something went wrong on the server. No allocation found",
            });
            setAlertOpen(true);
            return;
          }
          setAllocRound(response.data[0]);
        });
    }
  }, [allocRoundContext]);

  return (
    <Typography component="div" variant="allocRoundControlPanel">
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      Allocation {allocRoundContext?.allocRoundId}&nbsp;:&nbsp;
      {allocRoundContext?.allocRoundName}&nbsp;{" "}
      {allocRound?.isReadOnly === 0 && "-"} &nbsp;
      {allocRound?.isReadOnly === 0 &&
        `After 'Start' or 'Reset'
      wait for a few seconds`}
      <br />
      {allocRound?.isReadOnly === 0 ? (
        <>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              allocationPost.startAlloc(allocRoundContext?.allocRoundId);
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
              allocationPost.resetAlloc(allocRoundContext?.allocRoundId);
              setDelayedClickedToggle();
            }}
            disabled={!isClicked}
          >
            Reset Allocation
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          className="redButton disabledButton"
          disabled
        >
          Alloc Round is Read Only
        </Button>
      )}
      <Link
        to={isClicked ? `/alloc-fail/${allocRoundContext?.allocRoundId}` : ""}
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
            allocRoundContext?.allocRoundId,
            sheetcolumns,
            saveAs,
            setAlertOptions,
          );
        }}
      >
        allocation report <DownloadIcon />
      </Button>
      {}
      <Button
        type="submit"
        variant="outlined"
        className="secondaryButton"
        style={{ display: roles.planner === "1" ? "" : "none" }}
        disabled={!isClicked}
        onClick={() => {
          getPlannerData(
            allocRoundContext?.allocRoundId,
            sheetcolumns,
            saveAs,
            setAlertOptions,
          );
        }}
      >
        Planner report <DownloadIcon />
      </Button>
      <Button
        type="submit"
        variant="outlined"
        className="secondaryButton"
        disabled={!isClicked}
        onClick={() => {
          getFullReport(sheetcolumns, saveAs, setAlertOptions);
        }}
      >
        Full report <DownloadIcon />
      </Button>
      <Button
        type="submit"
        variant="outlined"
        className="secondaryButton"
        onClick={toggleBarChart}
      >
        {showBarChart ? "Hide Bar Chart" : "Show Bar Chart"}
      </Button>
    </Typography>
  );
}
