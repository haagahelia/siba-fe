import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateEditBuilding";

import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import EditBuildingForm from "./EditBuildingForm";

export default function EditBuildingContainer({
  singleBuilding,
  getAllBuildings,
  setSingleBuilding,
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
      ...singleBuilding,
      description:
        singleBuilding.description === null ? "" : singleBuilding.description,
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

  async function submitEditedBuilding(values) {
    const editedBuilding = {
      id: values.id,
      name: capitalizeFirstLetter(values.name),
      description: values.description,
    };
    const result = await dao.editBuilding(editedBuilding);
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
    setSingleBuilding(formik.values);
    getAllBuildings();
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
        submit={submitEditedBuilding}
        submitValues={formik.values}
      />
      <EditBuildingForm formik={formik} />
    </div>
  );
}
