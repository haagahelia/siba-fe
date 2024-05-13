import { useEffect, useState } from "react";
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
  const [deleteSubjectData, setDeleteSubjectData] = useState(null);
  const [allocRound, setAllocRound] = useState(null);

  // Fetch alloc round by id to make sure is not read only:
  useEffect(() => {
    if (singleSubject?.id) {
      dao.fetchAllocRoundById(singleSubject.allocRoundId).then((response) => {
        if (!response.success) {
          Logger.error("Error fetching allocation rounds");
          setAlertOptions({
            severity: "error",
            title: "Error",
            message:
              "Oops! Something went wrong on the server. No allocation found",
          });
          setAlertOpen(true);
          return;
        }
        setAllocRound(response.data[0]);
      });
    }
  }, [singleSubject]);

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
      {allocRound?.isReadOnly === 0 ? (
        <Button
          variant="contained"
          className="redButton"
          onClick={() => submitDelete(singleSubject)}
        >
          Delete
        </Button>
      ) : (
        <Button
          variant="contained"
          disabled
          className="redButton disabledButton"
        >
          Allocation Round is Read Only
        </Button>
      )}
    </div>
  );
}
