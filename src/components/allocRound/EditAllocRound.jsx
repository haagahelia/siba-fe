import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateEditAllocRound";

import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import EditAllocRoundForm from "./EditAllocRoundForm";

export default function EditAllocRound({
  // Whenever the editAllocRound changes in the AllocRoundList.jsx file,
  // that information comes here as singleAllocRound
  singleAllocRound,
  incrementDataModifiedCounter,
  setSingleAllocRound,
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
    initialValues: singleAllocRound,
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

  async function submitEditedAllocRound(values) {
    const capitalName = capitalizeFirstLetter(values.name);
    const editedAllocRound = {
      name: capitalName,
      isReadOnly: values.isReadOnly,
      description: values.description,
      lastModified: values.lastModified,
      id: values.id,
    };
    const result = await dao.editAllocRound(editedAllocRound);
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
      message: `${values.name} updated successfully.`,
    });
    setAlertOpen(true);
    setSingleAllocRound(formik.values);
    // getAllAllocRounds();
    incrementDataModifiedCounter();
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
        submit={submitEditedAllocRound}
        submitValues={formik.values}
      />
      <EditAllocRoundForm formik={formik} />
    </div>
  );
}
