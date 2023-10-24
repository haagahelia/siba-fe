import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import BuildingList from "./BuildingList"; // Import your BuildingList component here

export default function BuildingListContainer({
  getAllBuildings,
  allBuildingsList,
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <CardHeader title="Building List" />
        <BuildingList
          getAllBuildings={getAllBuildings}
          allBuildingsList={allBuildingsList}
        />
      </CardContent>
    </Card>
  );
}
