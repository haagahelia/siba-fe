import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import ValidateAddSpace from "../../validation/ValidateAddSpace";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";

export default function ImportSpaceButton({
  spaceToImport,
  spaceFailedToImport,
  setSpaceFailedToImport,
  getAllSpaces,
  buildingSelectList,
  spaceTypeSelectList,
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

  const processSpace = async (space, spaceSet) => {
    if (!isBuildingNameCorrect(space)) {
      space.FailedReason = "Non-existent building";
      return space;
    } else if (!isSpaceTypeCorrect(space)) {
      space.FailedReason = "Non-existent space type";
      return space;
    } else {
      const newSpace = {
        name: space.Name ? space.Name : "",
        area: space.Area ? space.Area : "",
        info: space.Info ? space.Info : "",
        personLimit: space["Person limit"] ? space["Person limit"] : "",
        buildingName: space.Building ? space.Building : "",
        availableFrom: space["Available from"] ? space["Available from"] : "",
        availableTo: space["Available to"] ? space["Available to"] : "",
        classesFrom: space["Classes from"] ? space["Classes from"] : "",
        classesTo: space["Classes to"] ? space["Classes to"] : "",
        inUse:
          space["Is in use"] !== undefined && space["Is in use"] !== null
            ? 1
            : 0,
        spaceType: space["Space type"] ? space["Space type"] : "",
      };

      //check if (spaceName, buildingName is unique)
      const key = `${newSpace.name}-${newSpace.buildingName}`;

      if (spaceSet.has(key)) {
        space.FailedReason =
          "Duplicated space name in the same building in the file";
        return space;
      } else {
        spaceSet.add(key);
      }

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
          validateResult.inUse;

        return space;
      } else {
        return newSpace;
      }
    }
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
