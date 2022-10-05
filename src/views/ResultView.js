import Result from "../components/Result";
import ProgramResult from "../components/ProgramResult";
import testData from "../testData";
import ProgramsRooms from "../components/ProgramsRooms"
export default function () {
  return(
    <>
      <ProgramResult data = {testData.programs}/>
      <div style={{width:'80%', margin:'auto'}}>
        <Result data = {testData.rooms}/>
      </div>
      <div style={{width:'80%', margin:'auto'}}>
        <ProgramsRooms data = {testData.programs}/>
      </div>
    </>
  )
}
