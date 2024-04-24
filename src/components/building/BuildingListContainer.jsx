import React from "react";
import BuildingList from "./BuildingList";

export default function BuildingListContainer({
  getAllBuildings,
  allBuildingsList,
  paginateBuildings,
}) {
  return (
    <BuildingList
      getAllBuildings={getAllBuildings}
      allBuildingsList={allBuildingsList}
      paginateBuildings={paginateBuildings}
    />
  );
}
