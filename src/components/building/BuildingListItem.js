import React from "react";
import BuildingDisplay from "./BuildingDisplay";

export default function BuildingListItem(props) {
  const { singleBuilding } = props;

  return (
    <BuildingDisplay singleBuilding={singleBuilding} flexDirection={"row"} />
  );
}
