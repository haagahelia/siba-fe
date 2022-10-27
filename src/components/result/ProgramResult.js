import * as React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from "@mui/material/Modal";
import { Box, Button, Collapse } from "@mui/material";
import Result from "./Result";
import testData from "../../data/testData";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function ProgramResult(props) {
  const programs = props.data;
  const [open, setOpen] = React.useState(false);
  const [programId, setProgramId] = React.useState(0);
  const [programName, setProgramName] = React.useState("");
  const handleOpen = (id, name) => {
    setProgramId(id);
    setOpen(true);
    setProgramName(name);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
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
            {programName} -subjects
          </Typography>
          <Result data={testData.subjects[programId]} />
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
        {programs.map((prog) => {
          const progress = (prog.allocatedHours / prog.requiredHours) * 100;
          const color =
            progress > 100 ? "#FF1700" : progress < 80 ? "#FFE400" : "#06FF00";

          return (
            <>
              <Grid2 xs={1.5}>
                <InfoOutlinedIcon
                  sx={{ color: "white", fontSize: 20 }}
                  onClick={() => handleOpen(prog.id, prog.name)}
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
                  // Jouduin kommentoimaan pois muutoin appi ei toiminut
                  // style= {styles.section}
                  baseBgColor={"#272121"}
                  labelColor={"black"}
                  bgColor={color}
                  padding={"3px"}
                  completed={`${progress.toFixed(2)}%`}
                />
                {CollapsedRow(prog)}
              </Grid2>
            </>
          );
        })}
      </Grid2>
    </>
  );

  function CollapsedRow(prog1) {
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
                Rooms
              </Typography>
            </Grid2>
            <Grid2 xs={4}>
              <Typography style={{ color: "#F6E9E9", fontSize: 20 }}>
                Hours
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
                      marginTop: 20,
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
                      marginTop: 20,
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