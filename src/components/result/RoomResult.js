import React, { useEffect, useState, useContext } from "react";
import { Typography } from "@mui/material";
import AllocRoundControlPanel from "../AllocRound/AllocRoundControlPanel";
import resultRoomsStore from "../../data/ResultRoomsStore";
import RoomsWithTimesList from "../room/RoomsWithTimesList";
import { AppContext } from "../../AppContext";
import Logger from "../../logger/logger";

export default function RoomResult(props) {
  const roomStore = resultRoomsStore;
  const [rooms, setRooms] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);
  const appContext = useContext(AppContext);
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
    <div
      sx={{
        width: "80%",
        margin: "auto",
      }}
    >
      <AllocRoundControlPanel incrementResetCounter={incrementResetCounter} />
      <Typography
        variant="h5"
        sx={{
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        Spaces (Huoneet)
      </Typography>
      <div
        sx={{
          display: "flex",
          gap: (theme) => theme.spacing(4),
          marginTop: (theme) => theme.spacing(3),
          marginBottom: (theme) => theme.spacing(5),
        }}
      >
        <div
          sx={(theme) => ({
            ...theme.components.IndexRooms.luentoluokkaindex,
            marginLeft: (theme) => theme.spacing(4),
          })}
        >
          <Typography>Lecture class</Typography>
        </div>
        <div
          sx={(theme) => ({
            ...theme.components.IndexRooms.studioindex,
            marginLeft: (theme) => theme.spacing(4),
          })}
        >
          <Typography>Studio</Typography>
        </div>
        <div
          sx={(theme) => ({
            ...theme.components.IndexRooms.esitystilaindex,
            marginLeft: (theme) => theme.spacing(4),
          })}
        >
          <Typography>Performance space</Typography>
        </div>
        <div
          sx={(theme) => ({
            ...theme.components.IndexRooms.musiikkiluokkaindex,
            marginLeft: (theme) => theme.spacing(4),
          })}
        >
          <Typography>Music class</Typography>
        </div>
      </div>

      <RoomsWithTimesList rooms={rooms} />
    </div>
  );
}
