import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateEditSpaceType";

import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import EditSpaceTypeForm from "./EditSpaceTypeForm";

export default function EditSpaceTypeContainer({
  singleSpaceType,
  getAllSpaceTypes,
  setSingleSpaceType,
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
    initialValues: {
      ...singleSpaceType,
      description:
        singleSpaceType.description === null ? "" : singleSpaceType.description,
    },
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to edit ${values.name}?`,
        content: `Press continue to save ${values.name} new information.`,
      });
      setDialogOpen(true);
      return;
    },
  });

  async function submitEditedSpaceType(values) {
    const editedSpaceType = {
      id: values.id,
      name: capitalizeFirstLetter(values.name),
      acronym: values.acronym.toUpperCase(),
      description: values.description,
    };
    const result = await dao.editSpaceType(editedSpaceType);
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
    setSingleSpaceType(formik.values);
    getAllSpaceTypes();
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
        submit={submitEditedSpaceType}
        submitValues={formik.values}
      />
      <EditSpaceTypeForm formik={formik} />
    </div>
  );
}
