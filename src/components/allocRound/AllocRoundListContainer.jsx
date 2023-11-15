import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
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
      <Container maxWidth="xl">
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
      </Container>
    </div>
  );
}
