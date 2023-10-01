import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSubject({
  singleSubject,
  getAllSubjects,
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

  const deleteSubject = async (value) => {
    let result = await dao.deleteSingleSubject(value);
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

    getAllSubjects();
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.subjectName}?`,
      content: `Press continue to delete ${data.subjectName} from the listing.`,
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
        submit={deleteSubject}
        submitValues={deleteId}
      />
      <Button
        variant="contained"
        color="red"
        onClick={() => submitDelete(singleSubject)}
      >
        Delete
      </Button>
    </div>
  );
}
