import "../styles/ResultView.css";
import AllocRoundControlPanel from "../components/AllocRound/AllocRoundControlPanel";
import ProgramResult from "../components/result/ProgramResult";

// component for displaying the calculation results, i.e. the allocation
const ProgramResultView = function () {
  return (
    <>
      <AllocRoundControlPanel />
      <ProgramResult />
    </>
  );
};

export default ProgramResultView;
