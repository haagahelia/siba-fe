import SpaceTypeDisplay from "./SpaceTypeDisplay";

export default function SpaceTypeListItem({ singleSpaceType }) {
  return (
    <SpaceTypeDisplay singleBuilding={singleSpaceType} flexDirection="row" />
  );
}
