import Result from "../components/Result";
import ProgramResult from "../components/ProgramResult";
import testData from "../testData";
export default function () {
  return(
    <>
      <ProgramResult data = {testData.programs}/>
      <div style={{width:'80%', margin:'auto'}}>
        <Result data = {testData.rooms}/>
      </div>
    </>
  )
}
