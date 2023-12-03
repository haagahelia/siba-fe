// The Program Results Page
import useTheme from "@mui/material/styles/useTheme";
import { Fragment, useContext, useEffect, useState } from "react";
import { AllocRoundContext } from "../../AppContext";
import resultProgramStore from "../../data/ResultProgramStore";
import testData from "../../data/testData";
import Logger from "../../logger/logger";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import ProgressBar from "@ramonak/react-progress-bar";
import AllocRoundControlPanel from "../allocRound/AllocRoundControlPanel";
import CollapsedRow from "./CollapsedRow";
import SubjectResult from "./SubjectResult";
import { margins } from "../../styles/theme";

// component for displaying the subject groups of the allocation result shows:
// the name of the subject groups
// the hours needed by the subject group divided by the hours allocated to it %%
// the name of the subject group rooms in the dropdown
// popup button that shows the lessons of the subject group

export default function ProgramResult() {
  Logger.logPrefix = "ProgramResult";
  Logger.debug("ProgramResult component instantiated.");

  const { allocRoundContext } = useContext(AllocRoundContext);
  const theme = useTheme();

  const [progs, setProgs] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);
  const [subProg, setSubProg] = useState({});
  const [open, setOpen] = useState(false);

  const progStore = resultProgramStore;

  useEffect(() => {
    Logger.debug("Running effect to fetch program data.");
    getProgramData();

    return () => {};
  }, [resetCounter]);

  const getProgramData = async () => {
    Logger.debug("getProgramData: fetching program names.");
    await progStore.fetchNames(allocRoundContext.allocRoundId);
    const names = progStore.getNames();
    Logger.debug(
      `getProgramData: successfully fetched ${names.length} program names.`
    );
    setProgs(names);
  };

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
    for (const element of array) {
      allocatedHours += element.allocatedHours;
      requiredHours += element.requiredHours;
    }

    return requiredHours && allocatedHours !== null
      ? Math.round((allocatedHours / requiredHours) * 100)
      : 0;
  };

  useEffect(() => {
    document.title = "Program Results";
  }, []);

  return (
    <>
      <AllocRoundControlPanel incrementResetCounter={incrementResetCounter} />
      <Typography className="m-1" variant="pageHeader">
        Programs (Aineryhmät)
      </Typography>
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <Box
          sx={{
            width: "80%",
            margin: margins.auto,
            borderRadius: 20,
            marginTop: margins.large,
            backgroundColor: (theme) => theme.palette.background.default,
            position: "relative",
          }}
        >
          <div
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              zIndex: 1000,
            }}
            onClick={handleClose}
            onKeyDown={handleClose}
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle:
                hidden from assistive tech */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={1.5}
              style={{
                width: "24px",
                height: "24px",
                stroke: theme.palette.infoIcon.main,
              }}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <Typography
            sx={{
              textAlign: "center",
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
        rowSpacing={{
          md: 3,
          lg: 2,
          xl: 1,
        }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
        variant="resultContainer"
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
            <Fragment key={prog.id}>
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
                  baseBgColor={theme.palette.progressBarBackground.main}
                  labelAlignment="left"
                  labelColor={textColor}
                  bgColor={progressColor}
                  padding="3px"
                  completed={progress}
                  maxCompleted={100}
                />
                <CollapsedRow prog1={prog} />
              </Grid2>
            </Fragment>
          );
        })}
      </Grid2>
    </>
  );
}
