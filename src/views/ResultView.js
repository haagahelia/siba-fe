import Result from "../components/result/Result";
import ProgramResult from "../components/result/ProgramResult";
import testData from "../data/testData";
import "../styles/ResultView.css";
import { Button, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import resultRoomsStore from "../data/ResultRoomsStore";
import resultProgramStore from "../data/ResultProgramStore";
import allocationPost from "../data/AllocationPost";
import theme, { globalTheme } from "../components/styles/theme";
// Tee funktiolle muuttuja

/*
const ExampleComponent = (props) => {  

  You can use Hooks here!  
  
  return <div />;};

export default ExampleComponent; */

export default function () {
  const roomStore = resultRoomsStore;
  const progStore = resultProgramStore;

  const [isClicked, setIsClicked] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [progs, setProgs] = useState([]);

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
      <ThemeProvider theme={globalTheme}>
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
      </ThemeProvider>
      <Typography style={{ color: "#F6E9E9", margin: 20 }}>
        Aineryhmä
      </Typography>
      <ProgramResult data={testData.programs} programs={progs} />
      <div style={{ width: "80%", margin: "auto" }}>
        <Typography style={{ color: "#F6E9E9" }}>Huoneet</Typography>
        <Result data={rooms} dropdownData={testData.programs} />
      </div>
    </>
  );
}
