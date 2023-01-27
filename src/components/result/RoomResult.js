import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, Typography, Box } from "@mui/material";
import theme from "../styles/theme";
import resultRoomsStore from "../../data/ResultRoomsStore";

//a component for displaying allocation results
//shows:
//the name of the room
//utilization rate
//the classes using the room in the dropdown

export default function RoomResult(props) {
  return (
    <>
      <Grid2
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
        style={{
          margin: "auto",
          marginTop: 20,
          backgroundColor: "#363333",
          padding: 10,
          borderRadius: 20,
        }}
      >
        {props.data.map((prog) => {
          const progress = (prog.allocatedHours / prog.requiredHours) * 100;

          const color =
            progress > 100 ? "#FF1700" : progress < 80 ? "#FFE400" : "#06FF00";

          const textColor = progress === 0 ? "white" : "black";

          return (
            <>
              <Grid2
                xs={3}
                style={
                  prog.spaceTypeId === 5001
                    ? theme.components.AllocRoom.studio
                    : prog.spaceTypeId === 5002
                    ? theme.components.AllocRoom.luentoluokka
                    : prog.spaceTypeId === 5003
                    ? theme.components.AllocRoom.esitystila
                    : theme.components.AllocRoom.musiikkiluokka
                }
              >
                {prog.name}
              </Grid2>
              <Grid2 xs={3}>
                <ProgressBar
                  labelAlignment={"left"}
                  baseBgColor={"#272121"}
                  labelColor={textColor}
                  bgColor={color}
                  padding={"3px"}
                  completed={Math.round(progress)}
                />
                {CollapsedRow(prog.id)}
              </Grid2>
            </>
          );
        })}
      </Grid2>
    </>
  );
}

//have to edit when the correct data comes, for now an illustrative version.
function CollapsedRow(id) {
  const [expand, setExpand] = React.useState(false);
  const [subjects, setSubjects] = React.useState([]);

  const getSubjects = async () => {
    console.log(id);
    await resultRoomsStore.fetchRoomSubs(id, 10004);
    setSubjects(resultRoomsStore.roomSubs);
  };

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
          onClick={() => {
            getSubjects();
            setExpand(!expand);
          }}
        >
          {" "}
        </KeyboardArrowDownIcon>
      )}

      <Collapse in={expand} style={{ width: "100%" }}>
        <Grid2 container>
          <Grid2 xs={8}>
            <Typography style={{ color: "#F6E9E9", fontSize: 20 }}>
              Opetukset
            </Typography>
          </Grid2>
          <Grid2 xs={4}>
            <Typography style={{ color: "#F6E9E9", fontSize: 20 }}>
              Tunnit
            </Typography>
          </Grid2>
        </Grid2>
        {subjects?.map((dropdownItem) => {
          return (
            <Grid2 container>
              <Grid2 xs={8}>
                {" "}
                <Typography
                  style={{
                    textAlign: "left",
                    marginTop: 10,
                    color: "#F6E9E9",
                  }}
                >
                  {dropdownItem.name}
                </Typography>
              </Grid2>
              <Grid2 xs={4}>
                <Typography
                  style={{
                    textAlign: "left",
                    marginTop: 10,
                    color: "#F6E9E9",
                  }}
                >
                  {dropdownItem.totalTime}
                </Typography>
              </Grid2>
            </Grid2>
          );
        })}
      </Collapse>
    </Grid2>
  );
}
