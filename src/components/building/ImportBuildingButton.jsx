import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import { validate } from "../../validation/ValidateAddBuilding";

import Button from "@mui/material/Button";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";

export default function ImportBuildingButton({
  buildingToImport,
  buildingFailedToImport,
  setBuildingFailedToImport,
  getAllBuildings,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const processBuilding = async (building, buildingSet) => {
    const newBuilding = {
      name: building.name ? capitalizeFirstLetter(building.name) : "",
      description: building.description ? building.description : "",
    };

    if (buildingSet.has(newBuilding.name)) {
      building.FailedReason = "Name of building is duplicated in the file";
      return building;
    } else {
      buildingSet.add(newBuilding.name);
    }

    const validateResult = await validate(newBuilding);

    building.FailedReason = validateResult.name || validateResult.description;

    return building.FailedReason ? building : newBuilding;
  };

  const handleClick = async () => {
    await importData(
      buildingToImport,
      buildingFailedToImport,
      setBuildingFailedToImport,
      getAllBuildings,
      processBuilding,
      dao.postNewBuildings,
      setAlertOpen,
      setAlertOptions,
    );
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Button
        variant="addComponentFormButton"
        onClick={() => {
          handleClick();
        }}
      >
        Import data
      </Button>
    </>
  );
}
