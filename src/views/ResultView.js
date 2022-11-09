import Result from "../components/result/Result";
import ProgramResult from "../components/result/ProgramResult";
import testData from "../data/testData";
import "../styles/ResultView.css";
import { Typography } from "@mui/material";

// Tee funktiolle muuttuja

/*
const ExampleComponent = (props) => {  

  You can use Hooks here!  
  
  return <div />;};

export default ExampleComponent; */

export default function () {
  return (
    <>
      <Typography style={{ color: "#F6E9E9", margin: 20 }}>
        Aineryhmä
      </Typography>
      <ProgramResult data={testData.programs} />
      <div style={{ width: "80%", margin: "auto" }}>
        <Typography style={{ color: "#F6E9E9" }}>Huoneet</Typography>
        <Result data={testData.rooms} dropdownData={testData.programs} />
      </div>
    </>
  );
}
