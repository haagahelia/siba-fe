import BuildingDisplay from "./BuildingDisplay";

export default function BuildingListItem({ singleBuilding }) {
  return (
    <BuildingDisplay singleBuilding={singleBuilding} flexDirection="row" />
  );
}
