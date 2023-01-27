import * as React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from "@mui/material/Modal";
import { Box, Button, Collapse } from "@mui/material";
import SubjectResult from "./SubjectResult";
import testData from "../../data/testData";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import resultProgramStore from "../../data/ResultProgramStore";

//component for displaying the subject groups of the allocation result
//shows:
//the name of the subject groups
//the hours needed by the subject group divided by the hours allocated to it %%
//the name of the subject group rooms in the dropdown
//popup button that shows the lessons of the subject group

export default function ProgramResult(props) {
  const programs = props.data;
  const progStore = resultProgramStore;
  const [subProg, setSubProg] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = (prog) => {
    setSubProg(prog);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
      <Modal open={open} onClose={handleClose} style={{ overflow: "scroll" }}>
        <Box
          style={{
            width: "80%",
            margin: "auto",
            borderRadius: 20,
            backgroundColor: "#363333",
            marginTop: "10%",
          }}
        >
          <Typography
            style={{ textAlign: "center", marginTop: "5%", color: "#F6E9E9" }}
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
          padding: 2,
          margin: "auto",
          width: "80%",
          marginTop: 20,
          backgroundColor: "#363333",
          padding: 10,
          borderRadius: 20,
        }}
      >
        {props.programs.map((prog) => {
          const progress = calculateProsent(prog.subjects);

          const color =
            progress > 100 ? "#FF1700" : progress < 80 ? "#FFE400" : "#06FF00";

          const textColor = progress === 0 ? "white" : "black";

          return (
            <>
              <Grid2 xs={1.5}>
                <InfoOutlinedIcon
                  sx={{ color: "white", fontSize: 20 }}
                  onClick={() => handleOpen(prog)}
                >
                  {" "}
                </InfoOutlinedIcon>
              </Grid2>

              <Grid2 xs={1.5}>
                <Typography style={{ color: "#F6E9E9" }}>
                  {prog.name}
                </Typography>
              </Grid2>

              <Grid2 xs={3}>
                <ProgressBar
                  // Had to comment out, otherwise the button wouldn't work
                  // style= {styles.section}
                  baseBgColor={"#272121"}
                  labelAlignment={"left"}
                  labelColor={textColor}
                  bgColor={color}
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

  function CollapsedRow(props) {
    const prog1 = props.prog1;
    const [expand, setExpand] = React.useState(false);

    return (
      <Grid2 container>
        {expand ? (
          <KeyboardArrowUpIcon
            sx={{ color: "white", fontSize: 24 }}
            onClick={() => setExpand(!expand)}
          >
            {" "}
          </KeyboardArrowUpIcon>
        ) : (
          <KeyboardArrowDownIcon
            sx={{ color: "white", fontSize: 24 }}
            onClick={() => setExpand(!expand)}
          >
            {" "}
          </KeyboardArrowDownIcon>
        )}

        <Collapse in={expand} style={{ width: "100%" }}>
          <Grid2 container>
            <Grid2 xs={8}>
              <Typography style={{ color: "#F6E9E9", fontSize: 20 }}>
                Huoneet
              </Typography>
            </Grid2>
            <Grid2 xs={4}>
              <Typography style={{ color: "#F6E9E9", fontSize: 20 }}>
                Tunnit
              </Typography>
            </Grid2>
          </Grid2>
          {prog1.rooms.map((room) => {
            return (
              <Grid2 container>
                <Grid2 xs={8}>
                  {" "}
                  <Typography
                    style={{
                      textAlign: "center",
                      marginTop: 5,
                      color: "#F6E9E9",
                    }}
                  >
                    {room.name}
                  </Typography>
                </Grid2>
                <Grid2 xs={4}>
                  <Typography
                    style={{
                      textAlign: "center",
                      marginTop: 5,
                      color: "#F6E9E9",
                    }}
                  >
                    {room.allocatedHours} h
                  </Typography>
                </Grid2>
              </Grid2>
            );
          })}
        </Collapse>
      </Grid2>
    );
  }
}
