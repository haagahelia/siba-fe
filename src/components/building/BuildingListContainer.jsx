import { Card, CardContent, CardHeader } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import BuildingList from "./BuildingList";

export default function BuildingListContainer({
  getAllBuildings,
  allBuildingsList,
}) {
  return (
    <Grid container rowSpacing={1}>
      <Card variant="outlined">
        <CardContent>
          <CardHeader title="Building List" />
          <BuildingList
            getAllBuildings={getAllBuildings}
            allBuildingsList={allBuildingsList}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
