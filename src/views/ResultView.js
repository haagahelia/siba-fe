import Result from "../components/result/Result";
import ProgramResult from "../components/result/ProgramResult";
import testData from "../data/testData";
import "../styles/ResultView.css";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import resultRoomsStore from "../data/ResultRoomsStore";
import resultProgramStore from "../data/ResultProgramStore";
// Tee funktiolle muuttuja

/*
const ExampleComponent = (props) => {  

  You can use Hooks here!  
  
  return <div />;};

export default ExampleComponent; */

export default function () {

  const roomStore = resultRoomsStore;
  const progStore = resultProgramStore;

  const [rooms, setRooms] = useState([]);
  const [progs, setProgs] = useState([]);

  useEffect(() => getRoomsData,[])
  useEffect(() => getProgramData,[])


  const getRoomsData = async () => {
    await roomStore.fetchRooms(10002);
    setRooms(roomStore.rooms);
  }

  const getProgramData = async () => {
    await progStore.fetchNames(10002);
    setProgs(progStore.getNames())
  }

  return (
    <>
      <Typography style={{color: "#F6E9E9", margin: 20}}>Aineryhmä</Typography>
      <ProgramResult data={testData.programs} programs={progs}/>
      <div style={{ width: "80%", margin: "auto" }}>
      <Typography style={{color: "#F6E9E9"}}>Huoneet</Typography>
      <Result data={rooms} dropdownData={testData.programs}/>
      </div>
    </>
  );
}
