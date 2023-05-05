import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useTheme } from "@mui/material/styles";
import { AppContext } from "../../AppContext";

export default function DeleteAllocRound(props) {
  const appContext = useContext(AppContext);
  const {
    singleAllocRound,
    //getAllAllocRounds,
    incrementDataModifiedCounter,
  } = props;
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
    let result = await dao.deleteSingleAllocRound(value);
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
  const theme = useTheme();

  const submitDelete = (data) => {
    if (data.id === appContext.allocRoundId) {
      //Prevent deleting a selected allocation round
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
    setDeletedName(data.name); //store the name of the deleted object
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
        //theme button red
        variant="contained"
        style={theme.components.MuiButton.redbutton}
        onClick={() => submitDelete(singleAllocRound)}
      >
        Delete
      </Button>
    </div>
  );
}
