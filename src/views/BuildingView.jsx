import React from "react";
import AddBuildingContainer from "../components/building/AddBuildingContainer";
import BuildingListContainer from "../components/building/BuildingListContainer";
import { useRoleLoggedIn } from "../hooks/useRoleLoggedIn";

export default function BuildingView({ getAllBuildings }) {
  const { roles } = useRoleLoggedIn();

  return (
    <div>
      {(roles.admin === "1" || roles.planner === "1") && (
        <AddBuildingContainer getAllBuildings={getAllBuildings} />
      )}
      <BuildingListContainer />
    </div>
  );
}
