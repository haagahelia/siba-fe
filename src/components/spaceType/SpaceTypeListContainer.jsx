import { Card, CardContent } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import SpaceTypeList from "./SpaceTypeList";

export default function SpaceTypeListContainer({
  getAllSpaceTypes,
  allSpaceTypesList,
  paginateSpaceTypes,
}) {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Card variant="outlined">
          <CardContent>
            <SpaceTypeList
              getAllSpaceTypes={getAllSpaceTypes}
              allSpaceTypesList={allSpaceTypesList}
              paginateSpaceTypes={paginateSpaceTypes}
            />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
