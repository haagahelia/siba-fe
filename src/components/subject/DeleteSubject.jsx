import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
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
  const [deleteSubjectData, setDeleteSubjectData] = useState(null);

  const theme = useTheme();

  const deleteSubject = async (subjectData) => {
    const result = await dao.deleteSingleSubject(subjectData.id);
    if (result === false) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
      return;
    } else {
      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${subjectData.name} deleted successfully.`,
      });
      setAlertOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 4000);

      getAllSubjects();
    }
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
    });
    setDialogOpen(true);
    setDeleteSubjectData(data);
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
        submitValues={deleteSubjectData}
      />
      <Button
        variant="contained"
        style={theme.components.MuiButton.redbutton}
        onClick={() => submitDelete(singleSubject)}
      >
        Delete
      </Button>
    </div>
  );
}
