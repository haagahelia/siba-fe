import Result from "../components/result/Result";
import ProgramResult from "../components/result/ProgramResult";
import testData from "../data/testData";
import "../styles/ResultView.css";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import resultRoomsStore from "../data/ResultRoomsStore";
// Tee funktiolle muuttuja

/*
const ExampleComponent = (props) => {  

  You can use Hooks here!  
  
  return <div />;};

export default ExampleComponent; */

export default function () {
  const store = resultRoomsStore;
  const [rooms, setRooms] = useState([]);

  useEffect(() => getResultData, []);

  const getResultData = async () => {
    await store.fetchRooms(10002);
    setRooms(store.rooms);
  };

  return (
    <>
      <Typography style={{ color: "#F6E9E9", margin: 20 }}>
        Aineryhmä
      </Typography>
      <ProgramResult data={testData.programs} />
      <div style={{ width: "80%", margin: "auto" }}>
        <Typography style={{ color: "#F6E9E9" }}>Huoneet</Typography>
        <Result data={rooms} dropdownData={testData.programs} />
      </div>
    </>
  );
}
