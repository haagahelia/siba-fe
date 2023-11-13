import { Card, CardContent } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import BuildingList from "./BuildingList";

export default function BuildingListContainer({
  getAllBuildings,
  allBuildingsList,
  paginateBuildings,
}) {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Card variant="outlined">
          <CardContent>
            <BuildingList
              getAllBuildings={getAllBuildings}
              allBuildingsList={allBuildingsList}
              paginateBuildings={paginateBuildings}
            />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
