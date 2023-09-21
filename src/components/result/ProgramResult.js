import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Modal,
  Box,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ProgressBar from "@ramonak/react-progress-bar";
import AllocRoundControlPanel from "../AllocRound/AllocRoundControlPanel";
import resultProgramStore from "../../data/ResultProgramStore";
import CollapsedRow from "./CollapsedRow";
import SubjectResult from "./SubjectResult";
import { AppContext } from "../../AppContext";
import testData from "../../data/testData";
import Logger from "../../logger/logger";

export default function ProgramResult(props) {
  Logger.logPrefix = "ProgramResult";
  Logger.debug("ProgramResult component instantiated.");

  const progStore = resultProgramStore;
  const [progs, setProgs] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);
  const appContext = useContext(AppContext);
  const theme = useTheme(); // Use the `useTheme` hook to access the Material-UI theme.

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
      <Typography variant="h5" sx={{ marginY: (theme) => theme.spacing(2) }}>
        Programs (Aineryhmät)
      </Typography>
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <Box
          sx={{
            width: "80%",
            margin: "auto",
            borderRadius: 20,
            marginTop: (theme) => theme.spacing(2),
            backgroundColor: theme.palette.background.default,
            position: "relative",
          }}
        >
          <IconButton
            sx={{
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
              sx={{
                width: "24px",
                height: "24px",
                stroke: theme.palette.infoIcon.main,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </IconButton>
          <Typography
            sx={{
              textAlign: "center",
              marginTop: (theme) => theme.spacing(2),
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

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
        sx={{
          margin: "auto",
          width: "80%",
          marginTop: (theme) => theme.spacing(2),
          padding: (theme) => theme.spacing(2),
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
          const textColor =
            progress === 0
              ? theme.palette.progressBarTextZero.main
              : theme.palette.progressBarTextNonZero.main;

          return (
            <React.Fragment key={prog.id}>
              <Grid item xs={1.5}>
                <IconButton
                  sx={{
                    fontSize: 20,
                    color: theme.palette.infoIcon.main,
                  }}
                  onClick={() => handleOpen(prog)}
                >
                  <InfoOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1.5}>
                <Typography>{prog.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <ProgressBar
                  baseBgColor={theme.palette.progressBarBackground.main}
                  labelAlignment="left"
                  labelColor={textColor}
                  bgColor={progressColor}
                  padding="3px"
                  completed={progress}
                  maxCompleted={100}
                />
                <CollapsedRow prog1={prog} />
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
}
