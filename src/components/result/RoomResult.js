//import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
//import ProgressBar from "@ramonak/react-progress-bar";
//import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/material"; //Box ???
import { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import AllocRoundControlPanel from "../AllocRound/AllocRoundControlPanel";
import resultRoomsStore from "../../data/ResultRoomsStore";
import RoomsWithTimesList from "../room/RoomsWithTimesList";
import { AppContext } from "../../AppContext";
import Logger from "../../logger/logger";
//a component for displaying allocation results
//shows: 1.the name of the room 2. utilization rate 3. classes using the room

export default function RoomResult(props) {
  const roomStore = resultRoomsStore;
  const [rooms, setRooms] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);
  const appContext = useContext(AppContext);
  const theme = useTheme();
  Logger.logPrefix = "RoomResult";
  Logger.debug("RoomResult component instantiated.");

  useEffect(() => {
    getRoomsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCounter]);

  const getRoomsData = async () => {
    Logger.debug("getRoomsData: fetching room data from server.");
    await roomStore.fetchRooms(appContext.allocRoundId);
    Logger.debug(
      `getRoomsData: successfully fetched ${roomStore.rooms.length} rooms.`,
    );
    setRooms(roomStore.rooms);
  };

  const incrementResetCounter = () => {
    Logger.debug("Incrementing reset counter.");
    setResetCounter(resetCounter + 1);
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <AllocRoundControlPanel incrementResetCounter={incrementResetCounter} />
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
