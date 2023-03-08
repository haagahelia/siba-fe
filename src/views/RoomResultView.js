import AllocRoundControlPanel from "../components/AllocRound/AllocRoundControlPanel";
import RoomResult from "../components/result/RoomResult";

// component for displaying the calculation results, i.e. the allocation
const RoomResultView = () => {
  return (
    <>
      <AllocRoundControlPanel />
      <RoomResult />
    </>
  );
};

export default RoomResultView;
