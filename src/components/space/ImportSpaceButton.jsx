import Button from "@mui/material/Button";
import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import ValidateAddSpace from "../../validation/ValidateAddSpace";
import { normalizeTime } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";

export default function ImportSpaceButton({
  spaceToImport,
  spaceFailedToImport,
  setSpaceFailedToImport,
  getAllSpaces,
  buildingSelectList,
  spaceTypeSelectList,
  fileOptions,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const isBuildingNameCorrect = (space) =>
    buildingSelectList.some((building) =>
      building.name.includes(space.Building),
    );

  const isSpaceTypeCorrect = (space) =>
    spaceTypeSelectList.some((spaceType) =>
      spaceType.name.includes(space["Space type"]),
    );

  const isNotFalsy = (space, field) => {
    const fieldValue = space[field] ? String(space[field]).toLowerCase() : "";
    return (
      fieldValue === "yes" ||
      fieldValue === "y" ||
      fieldValue === "1" ||
      fieldValue === "true"
    );
  };

  const processSpace = async (space, spaceSet) => {
    if (!isBuildingNameCorrect(space)) {
      space.FailedReason = "Non-existent building";
    } else if (!isSpaceTypeCorrect(space)) {
      space.FailedReason = "Non-existent space type";
    } else {
      const newSpace = {
        name: space.Name ? space.Name : "",
        area: space.Area ? space.Area : "",
        info: space.Info ? space.Info : "",
        personLimit: space["Person limit"] ? space["Person limit"] : "",
        buildingName: space.Building ? space.Building : "",
        availableFrom: space["Available from"]
          ? normalizeTime(space["Available from"])
          : "",
        availableTo: space["Available to"]
          ? normalizeTime(space["Available to"])
          : "",
        classesFrom: space["Classes from"]
          ? normalizeTime(space["Classes from"])
          : "",
        classesTo: space["Classes to"]
          ? normalizeTime(space["Classes to"])
          : "",
        inUse: isNotFalsy(space, "Is in use") ? 1 : 0,
        isLowNoise: isNotFalsy(space, "Is low noise") ? 1 : 0,
        spaceType: space["Space type"] ? space["Space type"] : "",
      };

      //check if (spaceName, buildingName is unique)
      const key = `${newSpace.name}-${newSpace.buildingName}`;

      if (spaceSet.has(key)) {
        space.FailedReason =
          "Duplicated space name in the same building in the file";
        return space;
      }
      spaceSet.add(key);

      const validateResult = await ValidateAddSpace(newSpace);
      if (validateResult) {
        space.FailedReason =
          validateResult.name ||
          validateResult.area ||
          validateResult.info ||
          validateResult.personLimit ||
          validateResult.availableFrom ||
          validateResult.availableTo ||
          validateResult.classesFrom ||
          validateResult.classesTo ||
          validateResult.inUse ||
          validateResult.isLowNoise;

        return space;
      }
      return newSpace;
    }
    return space;
  };

  const handleClick = async () => {
    await importData(
      spaceToImport,
      spaceFailedToImport,
      setSpaceFailedToImport,
      getAllSpaces,
      processSpace,
      dao.postNewSpaces,
      setAlertOpen,
      setAlertOptions,
      fileOptions,
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
