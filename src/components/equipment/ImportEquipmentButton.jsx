import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import ValidateAddEquipment, {} from "../../validation/ValidateAddEquipment";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";

export default function ImportEquipmentButton({
  equipmentToImport,
  equipmentFailedToImport,
  setEquipmentFailedToImport,
  getAllEquipments,
  fileOptions,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const processEquipment = async (equipment, equipmentSet) => {
    const newEquipment = {
      name: equipment.name ? capitalizeFirstLetter(equipment.name) : "",
      priority: equipment.priority ? equipment.priority : "",
      description: equipment.description ? equipment.description : "",
      isMovable:
        equipment.isMovable === "0" ||
        equipment.isMovable === 0 ||
        !equipment.isMovable
          ? 0
          : 1,
    };

    if (equipmentSet.has(newEquipment.name)) {
      equipment.FailedReason = "Name of equipment is duplicated in the file";
      return equipment;
    }
    equipmentSet.add(newEquipment.name);

    const validateResult = await ValidateAddEquipment(newEquipment);
    if (validateResult) {
      equipment.FailedReason =
        validateResult.name ||
        validateResult.priority ||
        validateResult.description ||
        validateResult.isMovable;

      return equipment;
    }
    return newEquipment;
  };

  const handleClick = async () => {
    await importData(
      equipmentToImport,
      equipmentFailedToImport,
      setEquipmentFailedToImport,
      getAllEquipments,
      processEquipment,
      dao.postNewEquipments,
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
