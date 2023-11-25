import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProgramList from "./ProgramList";

export default function ProgramListContainer({
  getAllPrograms,
  allProgramsList,
  paginatePrograms,
}) {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <ProgramList
              getAllPrograms={getAllPrograms}
              allProgramsList={allProgramsList}
              paginatePrograms={paginatePrograms}
            />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
