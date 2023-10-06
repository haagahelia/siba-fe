import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
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
      <Grid container rowSpacing={1}>
        <Card variant="outlined">
          <CardContent>
            <AllocRoundList
              getAllAllocRounds={getAllAllocRounds}
              allAllocRoundsList={allAllocRoundsList}
              paginateAllocRounds={paginateAllocRounds}
              setAllocRoundId={setAllocRoundId}
              incrementDataModifiedCounter={incrementDataModifiedCounter}
            />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
