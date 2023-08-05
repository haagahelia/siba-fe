import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material"; // Button???
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SubjectResult from "./SubjectResult";
import testData from "../../data/testData";
import AllocRoundControlPanel from "../AllocRound/AllocRoundControlPanel";
import resultProgramStore from "../../data/ResultProgramStore";
import CollapsedRow from "./CollapsedRow";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../AppContext";
import { useTheme } from "@mui/material";
import Logger from "../../logger/logger";
import { xIcon } from "../../styles/themeIcons";

//component for displaying the subject groups of the allocation result
//shows:
//the name of the subject groups
//the hours needed by the subject group divided by the hours allocated to it %%
//the name of the subject group rooms in the dropdown
//popup button that shows the lessons of the subject group

export default function ProgramResult(props) {
  Logger.logPrefix = "ProgramResult";
  Logger.debug("ProgramResult component instantiated.");

  const progStore = resultProgramStore;
  const [progs, setProgs] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);
  const appContext = useContext(AppContext);
  const theme = useTheme();

  useEffect(() => {
    Logger.debug("Running effect to fetch program data.");
    getProgramData();

    return () => {
      // cleanup function doing nothing
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCounter]);

  const getProgramData = async () => {
    Logger.debug("getProgramData: fetching program names.");
    await progStore.fetchNames(appContext.allocRoundId);
    const names = progStore.getNames();
    Logger.debug(
      `getProgramData: successfully fetched ${names.length} program names.`,
    );
    setProgs(names);
  };

  const [subProg, setSubProg] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = (prog) => {
    setSubProg(prog);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const incrementResetCounter = () => {
    setResetCounter(resetCounter + 1);
  };

  const calculateProsent = (array) => {
    let allocatedHours = 0;
    let requiredHours = 0;
    array.forEach((element) => {
      allocatedHours += element.allocatedHours;
      requiredHours += element.requiredHours;
    });

    return requiredHours && allocatedHours !== null
      ? Math.round((allocatedHours / requiredHours) * 100)
      : 0;
  };

  return (
    <>
      <AllocRoundControlPanel incrementResetCounter={incrementResetCounter} />
      <Typography style={{ margin: 20, fontSize: 24 }}>
        Programs (Aineryhmät)
      </Typography>
      <Modal open={open} onClose={handleClose} style={{ overflow: "scroll" }}>
        <Box
          style={{
            width: "80%",
            margin: "auto",
            borderRadius: 20,
            marginTop: "10%",
            backgroundColor: "#FFFFFF",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              zIndex: 1000,
            }}
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              style={{ width: "24px", height: "24px" }}
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <Typography
            style={{
              textAlign: "center",
              marginTop: "5%",
            }}
          >
            {subProg.name} -subjects
          </Typography>
          <SubjectResult
            data={subProg.subjects}
            dropdownData={testData.rooms}
          />
        </Box>
      </Modal>

      <Grid2
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
        style={{
          //padding: 2,
          margin: "auto",
          width: "80%",
          marginTop: 20,
          padding: 10,
          borderRadius: 20,
        }}
      >
        {progs.map((prog) => {
          const progress = calculateProsent(prog.subjects);
          const progressColor =
            progress >= 100
              ? theme.palette.progressBarGreen.main
              : progress < 80
              ? theme.palette.progressBarRed.main
              : theme.palette.progressBarYellow.main;
          const textColor = progress === 0 ? "white" : "black";

          return (
            <React.Fragment key={prog.id}>
              <Grid2 xs={1.5}>
                <InfoOutlinedIcon
                  sx={{ fontSize: 20, color: theme.palette.infoIcon.main }}
                  onClick={() => handleOpen(prog)}
                />
              </Grid2>
              <Grid2 xs={1.5} key={`${prog.id}-b`}>
                <Typography>{prog.name}</Typography>
              </Grid2>
              <Grid2 xs={3} key={`${prog.id}-c`}>
                <ProgressBar
                  baseBgColor={"#272121"}
                  labelAlignment={"left"}
                  labelColor={textColor}
                  bgColor={progressColor}
                  padding={"3px"}
                  completed={progress}
                  maxCompleted={100}
                />
                <CollapsedRow prog1={prog} />
              </Grid2>
            </React.Fragment>
          );
        })}
      </Grid2>
    </>
  );
}
