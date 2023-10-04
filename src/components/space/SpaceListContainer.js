import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import SingleSubjectDialog from "./SingleSubjectDialog";
import SpaceListItems from "./SpaceList";

export default function SpaceListContainer({
  getAllSpaces,
  allSpacesList,
  paginateSpaces,
  open,
  setOpen,
}) {
  return (
    <Container maxWidth="lg">
      {/*
        <SingleSubjectDialog
          getAllSubjects={getAllSpaces}
          open={open}
          setOpen={setOpen}
        />
      */}

      <Grid container spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <SpaceListItems
              getAllSpaces={getAllSpaces}
              allSpacesList={allSpacesList}
              paginateSpaces={paginateSpaces}
            />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
