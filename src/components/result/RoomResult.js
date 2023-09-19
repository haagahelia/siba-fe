import React, { useEffect, useState, useContext } from "react";
import { Typography, useTheme } from "@mui/material";
import AllocRoundControlPanel from "../AllocRound/AllocRoundControlPanel";
import resultRoomsStore from "../../data/ResultRoomsStore";
import RoomsWithTimesList from "../room/RoomsWithTimesList";
import { AppContext } from "../../AppContext";
import Logger from "../../logger/logger";
import { styled } from "@mui/system"; // Import styled from @mui/system

const HeaderTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: 24,
}));

const RoomCategoryTypography = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const RoomContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

export default function RoomResult(props) {
  const roomStore = resultRoomsStore;
  const [rooms, setRooms] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);
  const appContext = useContext(AppContext);
  const theme = useTheme();

  Logger.logPrefix = "RoomResult";
  Logger.debug("RoomResult component instantiated.");

  useEffect(() => {
    const getRoomsData = async () => {
      Logger.debug("getRoomsData: fetching room data from server.");
      await roomStore.fetchRooms(appContext.allocRoundId);
      Logger.debug(
        `getRoomsData: successfully fetched ${roomStore.rooms.length} rooms.`,
      );
      setRooms(roomStore.rooms);
    };

    getRoomsData();
  }, [resetCounter, appContext.allocRoundId, roomStore]);

  const incrementResetCounter = () => {
    Logger.debug("Incrementing reset counter.");
    setResetCounter(resetCounter + 1);
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <AllocRoundControlPanel incrementResetCounter={incrementResetCounter} />
      <HeaderTypography>Spaces (Huoneet)</HeaderTypography>
      <RoomContainer>
        <div style={theme.components.IndexRooms.luentoluokkaindex}>
          <RoomCategoryTypography>Lecture class</RoomCategoryTypography>
        </div>
        <div style={theme.components.IndexRooms.studioindex}>
          <RoomCategoryTypography>Studio</RoomCategoryTypography>
        </div>
        <div style={theme.components.IndexRooms.esitystilaindex}>
          <RoomCategoryTypography>Performance space</RoomCategoryTypography>
        </div>
        <div style={theme.components.IndexRooms.musiikkiluokkaindex}>
          <RoomCategoryTypography>Music class</RoomCategoryTypography>
        </div>
      </RoomContainer>
      <RoomsWithTimesList rooms={rooms} />
    </div>
  );
}
