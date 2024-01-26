import { useState } from "react";
import dao from "../../ajax/dao";
import ValidateAddEquipment from "../../validation/ValidateAddEquipment";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function AddEquipmentDialogConfirmation({
  open,
  setOpen,
  equipment,
  setEquipment,
  getAllEquipments,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const dialogOptions = {
    title: `Are you sure you want to add ${equipment?.name}`,
    content: `By clicking continue, ${equipment?.name} will be added to equipments.`,
  };

  const resetForm = () => {
    setEquipment({
      name: "",
      priority: "",
      description: "",
      isMovable: "",
    });
  };

  const addSingleEquipment = async () => {
    const validation = await ValidateAddEquipment(equipment);
    if (validation) {
      alert(Object.values(validation));
      return;
    }
    const success = await dao.postNewEquipment(equipment);
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
      return;
    }
    setAlertOptions({
      severity: "success",
      title: "Success!",
      message: `${equipment?.name} added.`,
    });
    setAlertOpen(true);
    resetForm();
    getAllEquipments();
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={open}
        dialogOptions={dialogOptions}
        setDialogOpen={setOpen}
        submit={addSingleEquipment}
        submitValues={equipment}
      />
    </>
  );
}
