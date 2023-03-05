//import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
//import ProgressBar from "@ramonak/react-progress-bar";
//import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/material"; //Box ???
import { useEffect, useState } from "react";
import resultRoomsStore from "../../data/ResultRoomsStore";

import { useTheme } from "@mui/material/styles";
import RoomsWithTimesList from "../room/RoomsWithTimesList";

//a component for displaying allocation results
//shows: 1.the name of the room 2. utilization rate 3. classes using the room

export default function RoomResult(props) {
  const roomStore = resultRoomsStore;
  const [rooms, setRooms] = useState([]);

  useEffect(() => getRoomsData);

  const getRoomsData = async () => {
    await roomStore.fetchRooms(10004);
    setRooms(roomStore.rooms);
  };

  const theme = useTheme();
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Typography style={{ color: "#F6E9E9", marginTop: "5%", fontSize: 24 }}>
        Spaces (Huoneet)
      </Typography>
      <div
        style={{
          display: "flex",
          gap: 100,
          marginTop: "3%",
          marginBottom: "5%",
        }}
      >
        <div style={theme.components.IndexRooms.luentoluokkaindex}>
          <Typography style={{ marginLeft: 40, color: "#F6E9E9" }}>
            {" "}
            Lecture class{" "}
          </Typography>
        </div>
        <div style={theme.components.IndexRooms.studioindex}>
          <Typography style={{ marginLeft: 40, color: "#F6E9E9" }}>
            {" "}
            Studio{" "}
          </Typography>
        </div>
        <div style={theme.components.IndexRooms.esitystilaindex}>
          <Typography style={{ marginLeft: 40, color: "#F6E9E9" }}>
            {" "}
            Performance space{" "}
          </Typography>
        </div>
        <div style={theme.components.IndexRooms.musiikkiluokkaindex}>
          <Typography style={{ marginLeft: 40, color: "#F6E9E9" }}>
            {" "}
            Music class{" "}
          </Typography>
        </div>
      </div>

      <RoomsWithTimesList rooms={rooms} />
    </div>
  );
}
