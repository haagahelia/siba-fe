import React from "react";
import SpaceTypeList from "./SpaceTypeList";

export default function SpaceTypeListContainer({
  getAllSpaceTypes,
  allSpaceTypesList,
  paginateSpaceTypes,
}) {
  return (
    <SpaceTypeList
      getAllSpaceTypes={getAllSpaceTypes}
      allSpaceTypesList={allSpaceTypesList}
      paginateSpaceTypes={paginateSpaceTypes}
    />
  );
}
