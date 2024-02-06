import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import ValidateEditEquipment from "../../validation/ValidateEditEquipment";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import EditEquipmentForm from "./EditEquipmentForm";

export default function EditEquipment({
  singleEquipment,
  setSingleEquipment,
  getAllEquipments,
}) {
  Logger.logPrefix = "EditEquipment";

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "alert message",
    title: "alert title",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: singleEquipment,
    validateOnChange: true,
    validate: ValidateEditEquipment,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to edit ${values.name}?`,
        content: `Press continue to save ${values.name} new information.`,
      });
      setDialogOpen(true);
    },
  });

  const submitEditedEquipment = async (submitValues) => {
    Logger.debug(
      `Submitting edits for equipment: ${JSON.stringify(submitValues)}`,
    );
    submitValues.name = capitalizeFirstLetter(submitValues.name);
    const success = await dao.editEquipment(submitValues, singleEquipment.id);
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
    } else {
      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${submitValues?.name} updated successfully.`,
      });
      setSingleEquipment(submitValues);
    }
    setAlertOpen(true);
    getAllEquipments();
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={submitEditedEquipment}
        submitValues={formik.values}
      />
      <EditEquipmentForm formik={formik} />
    </div>
  );
}
