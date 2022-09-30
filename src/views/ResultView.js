import Result from "../components/Result";
import testData from "../testData";
export default function () {
  return(
    <>
      <Result data = {testData.programs}/>
      <Result data = {testData.rooms}/>
      <Result data = {testData.subjects[1]}/>
    </>
  )
}
