import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SingleSpaceDialog from "./SingleSpaceDialog";
import SpaceList from "./SpaceList";

export default function SpaceListContainer({
  shownSpace,
  getAllSpaces,
  allSpacesList,
  paginateSpaces,
  setPaginateSpaces,
  open,
  setOpen,
}) {
  return (
    <Container maxWidth="lg">
      <SingleSpaceDialog
        getAllSpaces={getAllSpaces}
        singleSpace={shownSpace ? shownSpace : null}
        open={open}
        setOpen={setOpen}
        onClose={() => setOpen(false)}
      />

      <Grid container rowSpacing={2}>
        <Card variant="outlined">
          <CardContent>
            <SpaceList
              shownSpace={shownSpace}
              getAllSpaces={getAllSpaces}
              allSpacesList={allSpacesList}
              paginateSpaces={paginateSpaces}
              setPaginateSpaces={setPaginateSpaces}
            />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
