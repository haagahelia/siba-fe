import React from "react";
import Grid from "@mui/material/Grid";
// import SingleSubjectDialog from "./SingleSubjectDialog";
import SpaceListItems from "./SpaceList";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { Container } from "@mui/material";

export default function SpaceListContainer(props) {
  const { getAllSpaces, allSpacesList, paginateSpaces, open, setOpen } = props;
  return (
    <Container maxWidth="lg">
      {/*<SingleSubjectDialog
        getAllSubjects={getAllSpaces}
        open={open}
        setOpen={setOpen}
  />*/}

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
