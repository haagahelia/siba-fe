import AllocRoundList from "./AllocRoundList";

export default function AllocRoundListContainer({
  getAllAllocRounds,
  allAllocRoundsList,
  paginateAllocRounds,
  setAllocRoundId,
  incrementDataModifiedCounter,
}) {
  return (
    <div>
      <AllocRoundList
        getAllAllocRounds={getAllAllocRounds}
        allAllocRoundsList={allAllocRoundsList}
        paginateAllocRounds={paginateAllocRounds}
        setAllocRoundId={setAllocRoundId}
        incrementDataModifiedCounter={incrementDataModifiedCounter}
      />
    </div>
  );
}
