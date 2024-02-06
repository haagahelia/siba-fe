import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import { validate } from "../../validation/ValidateAddEditSetting";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import EditSettingForm from "./EditSettingForm";

export default function EditSettingContainer({
  singleSetting,
  getAllSettings,
  setSingleSetting,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });

  const formik = useFormik({
    // enableReinitialize checks if Formik needs to reset the form
    // if the initial values change
    enableReinitialize: true,
    initialValues: singleSetting,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to edit ${values.name}?`,
        content: `Press continue to save ${values.name} new information. `,
      });
      setDialogOpen(true);
      return;
    },
  });

  async function submitEditedSetting(values) {
    const editedSetting = {
      id: values.id,
      name: capitalizeFirstLetter(values.name),
      description: values.description,
      numberValue: values.numberValue,
      textValue: values.textValue,
    };
    const result = await dao.editSetting(editedSetting);
    Logger.debug(
      `Submitting edits for settings: ${JSON.stringify(editedSetting)}`,
    );
    if (!result) {
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
      message: `${values.name} new information added.`,
    });
    setAlertOpen(true);
    setSingleSetting(formik.values);
    getAllSettings();
  }

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
        submit={submitEditedSetting}
        submitValues={formik.values}
      />
      <EditSettingForm formik={formik} />
    </div>
  );
}
