import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import { AppContext } from "../../AppContext";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useTheme } from "@mui/material/styles";

export default function SelectAllocRound(props) {
  const { singleAllocRound } = props;
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
  const appContext = useContext(AppContext);

  const setAllocRound = (allocRoundId) => {
    //console.log ("allocRoundId 456: " +allocRoundId);
    appContext.allocRoundId = allocRoundId; // Works now! Updating app context.
    // setAllocRoundId(allocRoundId); // Notifying grangrangranparent. Updating component state
  };

  const allocationSelection = () => {
    //call function to set alloc round here
    setAllocRound(singleAllocRound.id);

    setAlertOptions({
      severity: "success",
      title: "Success!",
      message: `Alloc round ${singleAllocRound.id} selected.`,
    });
    setAlertOpen(true);
  };
  const theme = useTheme();

  const confirmAllocationSelection = () => {
    setDialogOptions({
      title: `Are you sure you want to change to ${singleAllocRound.id}?`,
      content: `Press continue to choose alloc round ${singleAllocRound.id} from the listing.`,
    });
    setDialogOpen(true);
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
        submit={allocationSelection}
      />
      <Button
        variant="contained"
        style={theme.components.MuiButton.greenbutton}
        onClick={confirmAllocationSelection}
      >
        Pick this allocation
      </Button>
    </div>
  );
}
