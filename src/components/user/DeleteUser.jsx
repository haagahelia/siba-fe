import Button from "@mui/material/Button";
import { useState } from "react";
import dao from "../../ajax/dao";

import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteUser({ singleUser, getAllUsers, setOpen }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const [deleteId, setDeleteId] = useState("");
  const currentUserEmail = localStorage.getItem("email");

  const deleteUser = async (userId) => {
    const result = await dao.deleteSingleUser(userId);
    if (result === false) {
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
      message: `${singleUser.email} removed.`,
    });
    setAlertOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 4000); // 4000ms (4 seconds) matches the autoHideDuration of the Snackbar

    getAllUsers();
  };

  const submitDelete = (data) => {
    if (data.email === currentUserEmail) {
      setDialogOptions({
        title: "Confirm Deletion",
        content: "Are you sure you want to delete your own profile?",
      });
      setDialogOpen(true);
      setDeleteId(data.id);
    } else {
      proceedToDelete(data);
    }
  };

  const proceedToDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.email}?`,
      content: `Press continue to delete ${data.email} from the listing.`,
    });
    setDialogOpen(true);
    setDeleteId(data.id);
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
        submit={deleteUser}
        submitValues={deleteId}
      />
      <Button
        variant="contained"
        color="red"
        onClick={() => submitDelete(singleUser)}
      >
        Delete
      </Button>
    </div>
  );
}
