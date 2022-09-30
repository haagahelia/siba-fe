import Result from "../components/Result";
import ProgramResult from "../components/ProgramResult";
import testData from "../testData";
export default function () {
  return(
    <>
      <ProgramResult data = {testData.programs}/>
      <Result data = {testData.rooms}/>
    </>
  )
}
