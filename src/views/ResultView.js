import Result from "../components/result/Result";
import ProgramResult from "../components/result/ProgramResult";
import testData from "../data/testData";
import ProgramsRooms from "../components/result/ProgramsRooms";
import "../styles/ResultView.css";

// Tee funktiolle muuttuja

/*
const ExampleComponent = (props) => {  

  You can use Hooks here!  
  
  return <div />;};

export default ExampleComponent; */

export default function () {
  return (
    <>
      <ProgramResult data={testData.programs} />
      <div style={{ width: "80%", margin: "auto" }}>
        <Result data={testData.rooms} />
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <ProgramsRooms data={testData.programs} />
      </div>
    </>
  );
}
