import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import ValidateEditEquipment from "../../validation/ValidateEditEquipment";
import AlertBox from "../common/AlertBox";
import EditEquipmentForm from "./EditEquipmentForm";

export default function EditEquipment({
  singleEquipment,
  setSingleEquipment,
  getAllEquipments,
}) {
  Logger.logPrefix = "EditEquipment";

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: singleEquipment,
    validateOnChange: true,
    validate: ValidateEditEquipment,
    onSubmit: (values) => {
      submitEditedEquipment(values);
    },
  });

  const submitEditedEquipment = async (submitValues) => {
    Logger.debug(
      `Submitting edits for equipment: ${JSON.stringify(singleEquipment)}`,
    );
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
      <EditEquipmentForm formik={formik} />
    </div>
  );
}
