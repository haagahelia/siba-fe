import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import { validate } from "../../validation/ValidateAddSpaceType";

import Button from "@mui/material/Button";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";

export default function ImportSpaceTypeButton({
  spaceTypeToImport,
  spaceTypeFailedToImport,
  setSpaceTypeFailedToImport,
  getAllSpaceTypes,
  fileOptions,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const processSpaceType = async (spaceType, spaceTypeSet) => {
    const newSpaceType = {
      name: spaceType.name ? capitalizeFirstLetter(spaceType.name) : "",
      description: spaceType.description ? spaceType.description : "",
    };

    if (spaceTypeSet.has(newSpaceType.name)) {
      spaceType.FailedReason = "Name of space type is duplicated in the file";
      return spaceType;
    }
    spaceTypeSet.add(newSpaceType.name);

    const validateResult = await validate(newSpaceType);
    spaceType.FailedReason = validateResult.name || validateResult.description;

    return spaceType.FailedReason ? spaceType : newSpaceType;
  };

  const handleClick = async () => {
    await importData(
      spaceTypeToImport,
      spaceTypeFailedToImport,
      setSpaceTypeFailedToImport,
      getAllSpaceTypes,
      processSpaceType,
      dao.postNewSpaceTypes,
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
