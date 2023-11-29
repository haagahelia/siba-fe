// The Room Results Page
import useTheme from "@mui/material/styles/useTheme";
import { useContext, useEffect, useState } from "react";
import { AllocRoundContext } from "../../AppContext";
import resultRoomsStore from "../../data/ResultRoomsStore";
import Logger from "../../logger/logger";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AllocRoundControlPanel from "../allocRound/AllocRoundControlPanel";
import RoomsWithTimesList from "../room/RoomsWithTimesList";

// a component for displaying allocation results
// shows: 1. the name of the room 2. utilization rate 3. classes using the room

export default function RoomResult() {
  Logger.logPrefix = "RoomResult";
  Logger.debug("RoomResult component instantiated.");

  const { allocRoundContext } = useContext(AllocRoundContext);
  const theme = useTheme();

  const [rooms, setRooms] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);

  const roomStore = resultRoomsStore;

  useEffect(() => {
    getRoomsData();
  }, [resetCounter]);

  const getRoomsData = async () => {
    Logger.debug("getRoomsData: fetching room data from server.");
    await roomStore.fetchRooms(allocRoundContext.allocRoundId);
    Logger.debug(
      `getRoomsData: successfully fetched ${roomStore.rooms.length} rooms.`,
    );
    setRooms(roomStore.rooms);
  };

  const incrementResetCounter = () => {
    Logger.debug("Incrementing reset counter.");
    setResetCounter(resetCounter + 1);
  };

  useEffect(() => {
    document.title = 'Room Results';
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <AllocRoundControlPanel incrementResetCounter={incrementResetCounter} />
      <Typography className="mt6" variant="pageHeader">
        Spaces (Huoneet)
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignSelf: "flex-end",
          gap: 2,
        }}
      >
        <div style={theme.components.IndexRooms.luentoluokkaindex} />
        <Typography variant="roomIndex"> Lecture class </Typography>
        
        <div style={theme.components.IndexRooms.studioindex} />
        <Typography variant="roomIndex"> Studio </Typography>
        
        <div style={theme.components.IndexRooms.esitystilaindex} />
        <Typography variant="roomIndex"> Performance space </Typography>
        
        <div style={theme.components.IndexRooms.musiikkiluokkaindex} />
          <Typography variant="roomIndex"> Music class </Typography>
      </Box>

      <RoomsWithTimesList rooms={rooms} />
    </div>
  );
}
