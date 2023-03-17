import React from "react";
import Grid from "@mui/material/Grid";
import BuildingList from "./BuildingList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";

export default function BuildingListContainer(props) {
  const { getAllBuildings, allBuildingsList } = props;
  return (
    <React.Fragment>
      <Grid
        container
        rowSpacing={1}
        justifyContent="space-evenly"
        alignItems="flex-start"
        marginTop="20px"
      >
        <Card variant="outlined">
          <CardContent>
            <BuildingList
              getAllBuildings={getAllBuildings}
              allBuildingsList={allBuildingsList}
            />
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
