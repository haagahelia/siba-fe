import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SingleSpaceDialog from "./SingleSpaceDialog";
import SpaceList from "./SpaceList";

export default function SpaceListContainer({
  getAllSpaces,
  allSpacesList,
  paginateSpaces,
  open,
  setOpen,
}) {
  return (
    <Container maxWidth="lg">
      <SingleSpaceDialog
        getAllSpaces={getAllSpaces}
        open={open}
        onClose={() => setOpen(false)}
      />

      <Grid container spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <SpaceList
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
