import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteDepartment({
  singleDepartment,
  getAllDepartments,
  setOpen,
}) {
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

  const deleteDepartment = async (value) => {
    let result = await dao.deleteDepartment(value);
    console.log(result);
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
      message: `${value.subjectName} removed.`,
    });
    setAlertOpen(true);
    setOpen(false);

    getAllDepartments();
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
    });
    setDialogOpen(true);
    setDeleteId(data.id);
    return;
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
        submit={deleteDepartment}
        submitValues={deleteId}
      />
      <Button
        variant="contained"
        color="red"
        onClick={() => submitDelete(singleDepartment)}
      >
        Delete
      </Button>
    </div>
  );
}
