import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateEditUser";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import EditUserForm from "./EditUserForm";

export default function EditUserContainer({
  // Whenever the editUser changes in the userList.js file,
  // that information comes here as singleUser
  singleUser,
  getAllUsers,
  setSingleUser,
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
    initialValues: singleUser,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to edit ${values.email}?`,
        content: `Press continue to save ${values.email} new information. `,
      });
      setDialogOpen(true);
      return;
    },
  });

  async function submitEditedUser(values) {
    let editedUser = {
      id: values.id,
      email: values.email,
      isAdmin: values.isAdmin,
      isPlanner: values.isPlanner,
      isStatist: values.isStatist,
    };
    let result = await dao.editUser(editedUser);
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
      message: `${values.email} new information added.`,
    });
    setAlertOpen(true);
    setSingleUser(formik.values);
    getAllUsers();
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
        submit={submitEditedUser}
        submitValues={formik.values}
      />
      <EditUserForm formik={formik} />
    </div>
  );
}
