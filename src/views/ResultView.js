import RoomResult from "../components/result/RoomResult";
import ProgramResult from "../components/result/ProgramResult";
import testData from "../data/testData";
import "../styles/ResultView.css";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import resultRoomsStore from "../data/ResultRoomsStore";
import resultProgramStore from "../data/ResultProgramStore";
import allocationPost from "../data/ResultAllocationStore";
import { useTheme } from "@mui/material/styles";

// component for displaying the calculation results, i.e. the allocation
export default function () {
  const roomStore = resultRoomsStore;
  const progStore = resultProgramStore;

  const [isClicked, setIsClicked] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [progs, setProgs] = useState([]);
  const theme = useTheme();

  useEffect(() => getRoomsData, []);
  useEffect(() => getProgramData, []);

  const getRoomsData = async () => {
    await roomStore.fetchRooms(10004);
    setRooms(roomStore.rooms);
  };

  const getProgramData = async () => {
    await progStore.fetchNames(10004);
    setProgs(progStore.getNames());
  };

  return (
    <>
      <Button
        type="submit"
        variant="contained"
        style={{ color: "white" }}
        onClick={() => {
          allocationPost.startAlloc();
          if (!isClicked) setIsClicked(true);
        }}
        disabled={isClicked}
      >
        Start Allocation
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="red"
        style={{ color: "white" }}
        onClick={() => {
          allocationPost.resetAlloc();
          if (isClicked) setIsClicked(false);
        }}
      >
        Reset Allocation
      </Button>
      <Typography style={{ color: "#F6E9E9", margin: 20, fontSize: 24 }}>
        Aineryhmät
      </Typography>

      <div style={{ display: "flex", marginLeft: 286.5 }}>
        <Link to="/alloc-fail/10004">
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            style={{ color: "#F6E9E9" }}
          >
            Show failed allocation
          </Button>
        </Link>
      </div>
      <ProgramResult data={testData.programs} programs={progs} />
      <div style={{ width: "80%", margin: "auto" }}>
        <Typography style={{ color: "#F6E9E9", marginTop: "5%", fontSize: 24 }}>
          Huoneet
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

        <RoomResult data={rooms} dropdownData={testData.programs} />
      </div>
    </>
  );
}
