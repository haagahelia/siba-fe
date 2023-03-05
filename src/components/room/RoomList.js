import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const RoomList = ({ rooms }) => {
  const theme = useTheme();
  return (
    <>
      <Grid2 container key="collapse_container_row36">
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
      {rooms.map((room) => (
        <Grid2 container key={`${room.id}-rooms in RoomList`}>
          <Grid2 xs={8}>
            {" "}
            <Typography
              style={{
                textAlign: "center",
                marginTop: 5,
                color: theme.baseBgColor,
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
      ))}
    </>
  );
};

export default RoomList;
