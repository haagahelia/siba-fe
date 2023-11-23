import useTheme from "@mui/material/styles/useTheme";
import { useContext, useState } from "react";
import { AllocRoundContext } from "../../AppContext";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteAllocRound({
  singleAllocRound,
  // getAllAllocRounds,
  incrementDataModifiedCounter,
}) {
  const { allocRoundContext } = useContext(AllocRoundContext);
  const theme = useTheme();

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
  const [deletedName, setDeletedName] = useState("");

  const deleteAllocRound = async (value) => {
    const result = await dao.deleteSingleAllocRound(value);
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
      message: `${deletedName} removed.`,
    });
    setAlertOpen(true);
    incrementDataModifiedCounter();
    // getAllAllocRounds();
  };

  const submitDelete = (data) => {
    if (data.id === allocRoundContext.allocRoundId) {
      // Prevent deleting a selected allocation round
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Cannot delete selected allocation round.",
      });
      setAlertOpen(true);
      return;
    }

    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
    });
    setDialogOpen(true);
    setDeleteId(data.id);
    setDeletedName(data.name); // store the name of the deleted object
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
        submit={deleteAllocRound}
        submitValues={deleteId}
      />
      <Button
        // theme button red
        variant="contained"
        style={theme.components.MuiButton.redbutton}
        onClick={() => submitDelete(singleAllocRound)}
      >
        Delete
      </Button>
    </div>
  );
}
