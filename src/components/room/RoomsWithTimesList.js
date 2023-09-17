import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import ProgressBar from "@ramonak/react-progress-bar";
//import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//import { Collapse } from "@mui/material"; //Box ???
//import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import CollapsedRowB from "../result/CollapsedRowB";

const RoomsWithTimesList = ({ rooms }) => {
  const theme = useTheme();
  return (
    <Grid2
      key="container for list"
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      spacing={2}
      style={{
        margin: "auto",
        marginTop: 20,
        padding: 10,
        borderRadius: 20,
      }}
    >
      {rooms.map((room) => {
        const progress = (room.allocatedHours / room.requiredHours) * 100;
        const progressColor =
          progress > 100
            ? theme.palette.progressBarRed.main
            : progress < 80
            ? theme.palette.progressBarYellow.main
            : theme.palette.progressBarGreen.main;
        const progressBarTextColor =
          progress === 0
            ? theme.palette.progressBarTextZero.main
            : theme.palette.progressBarTextNonZero.main;

        return (
          <React.Fragment key={room.id}>
            <Grid2
              xs={3}
              style={
                room.spaceTypeId === 5001
                  ? theme.components.AllocRoom.studio
                  : room.spaceTypeId === 5002
                  ? theme.components.AllocRoom.luentoluokka
                  : room.spaceTypeId === 5003
                  ? theme.components.AllocRoom.esitystila
                  : theme.components.AllocRoom.musiikkiluokka
              }
            >
              {room.name}
            </Grid2>
            <Grid2 xs={3} key={`${room.id}-b`}>
              <ProgressBar
                labelAlignment={"left"}
                baseBgColor={theme.palette.progressBarBackground.main}
                labelColor={progressBarTextColor}
                bgColor={progressColor}
                padding={"3px"}
                completed={Math.round(progress)}
              />
              <CollapsedRowB id={room.id} />
            </Grid2>
          </React.Fragment>
        );
      })}
    </Grid2>
  );
};

export default RoomsWithTimesList;
