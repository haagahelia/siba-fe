import React, { useState } from "react";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { capitalizeFirstLetter } from "../../validation/ValidateEditAllocRound";
import AlertBox from "../common/AlertBox";
import dao from "../../ajax/dao";
import EditAllocRoundForm from "./EditAllocRoundForm";

export default function EditAllocRound(props) {
  // Whenever the editAllocRound changes in the AllocRoundList.js file, that information comes here as singleAllocRound
  const { singleAllocRound, getAllAllocRounds, setSingleAllocRound } = props;
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
    // enableReinitialize checks if Formik needs to reset the form if the initial values ​​change
    enableReinitialize: true,
    initialValues: singleAllocRound,
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
    let capitalName = capitalizeFirstLetter(values.name);
    let editedAllocRound = {
      name: capitalName,
      description: values.description,
      lastModified: values.lastModified,
      id: values.id,
    };
    let result = await dao.editAllocRound(editedAllocRound);
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
    setSingleAllocRound(formik.values);
    getAllAllocRounds();
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
