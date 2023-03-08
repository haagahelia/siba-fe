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

//component for displaying the subject groups of the allocation result
//shows:
//the name of the subject groups
//the hours needed by the subject group divided by the hours allocated to it %%
//the name of the subject group rooms in the dropdown
//popup button that shows the lessons of the subject group

export default function ProgramResult(props) {
  const progStore = resultProgramStore;
  const [progs, setProgs] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);
  const appContext = useContext(AppContext);

  useEffect(() => {
    getProgramData();
  }, [resetCounter]);

  const getProgramData = async () => {
    await progStore.fetchNames(appContext.allocRoundId);
    setProgs(progStore.getNames());
  };

  const [subProg, setSubProg] = React.useState({});
  const [open, setOpen] = React.useState(false);
  //const theme = useTheme();

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
      <Typography style={{ color: "#F6E9E9", margin: 20, fontSize: 24 }}>
        Programs (Aineryhmät)
      </Typography>
      <Modal open={open} onClose={handleClose} style={{ overflow: "scroll" }}>
        <Box
          style={{
            width: "80%",
            margin: "auto",
            borderRadius: 20,
            marginTop: "10%",
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              marginTop: "5%",
              color: "primary",
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
            progress > 100 ? "#FF1700" : progress < 80 ? "#FFE400" : "#06FF00";
          const textColor = progress === 0 ? "white" : "black";

          return (
            <>
              <Grid2 xs={1.5} key={`${prog.id}-a`}>
                <InfoOutlinedIcon
                  sx={{ color: "white", fontSize: 20 }}
                  onClick={() => handleOpen(prog)}
                >
                  {" "}
                </InfoOutlinedIcon>
              </Grid2>

              <Grid2 xs={1.5} key={`${prog.id}-b`}>
                <Typography style={{ color: "#F6E9E9" }}>
                  {prog.name}
                </Typography>
              </Grid2>

              <Grid2 xs={3} key={`${prog.id}-c`}>
                <ProgressBar
                  // Had to comment out, otherwise the button wouldn't work
                  // style= {styles.section}
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
            </>
          );
        })}
      </Grid2>
    </>
  );
}
