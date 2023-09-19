import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from "@mui/material/Modal";
import { Box, Button, Typography } from "@mui/material";
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
    const getProgramData = async () => {
      Logger.debug("getProgramData: fetching program names.");
      await progStore.fetchNames(appContext.allocRoundId);
      const names = progStore.getNames();
      Logger.debug(
        `getProgramData: successfully fetched ${names.length} program names.`,
      );
      setProgs(names);
    };

    getProgramData();
  }, [resetCounter, appContext.allocRoundId, progStore]);

  const [subProg, setSubProg] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = (prog) => {
    setSubProg(prog);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const incrementResetCounter = () => {
    setResetCounter((prevCounter) => prevCounter + 1);
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
      <Typography variant="h4" sx={{ margin: 2 }}>
        Programs (Aineryhmät)
      </Typography>
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <Box
          sx={{
            width: "80%",
            margin: "auto",
            borderRadius: theme.shape.borderRadius,
            marginTop: theme.spacing(2),
            backgroundColor: theme.palette.background.default,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: theme.spacing(1),
              right: theme.spacing(1),
              cursor: "pointer",
              zIndex: 1000,
            }}
            onClick={handleClose}
          >
            <InfoOutlinedIcon
              sx={{ fontSize: 24, color: theme.palette.info.main }}
            />
          </div>
          <Typography
            variant="h5"
            align="center"
            sx={{ marginTop: theme.spacing(2) }}
          >
            {subProg.name} - subjects
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
        sx={{
          margin: "auto",
          width: "80%",
          marginTop: 2,
          padding: 2,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        {progs.map((prog) => {
          const progress = calculateProsent(prog.subjects);
          const progressColor =
            progress >= 100
              ? theme.palette.success.main
              : progress < 80
              ? theme.palette.error.main
              : theme.palette.warning.main;
          const textColor =
            progress === 0
              ? theme.palette.text.disabled
              : theme.palette.text.primary;

          return (
            <React.Fragment key={prog.id}>
              <Grid2 xs={1.5}>
                <Button
                  variant="text"
                  onClick={() => handleOpen(prog)}
                  sx={{
                    fontSize: 20,
                    color: theme.palette.info.main,
                    "& svg": { fill: "black" },
                  }}
                >
                  <InfoOutlinedIcon />
                </Button>
              </Grid2>
              <Grid2 xs={1.5}>
                <Typography>{prog.name}</Typography>
              </Grid2>
              <Grid2 xs={3}>
                <ProgressBar
                  baseBgColor={theme.palette.background.paper}
                  labelAlignment="left"
                  labelColor={textColor}
                  bgColor={progressColor}
                  padding={3}
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
