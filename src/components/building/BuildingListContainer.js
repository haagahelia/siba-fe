import React from "react";
import Grid from "@mui/material/Grid";
import BuildingList from "./BuildingList";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
import SingleBuildingDialog from "./SingleBuildingDialog";

export default function BuildingListContainer(props) {
  // console.log(props)
  const { getAllBuildings, allBuildingsList } = props;
  return (
    <div>
      <SingleBuildingDialog getAllBuildings={getAllBuildings} />
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
    </div>
  );
}
