import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import { AllocRoundContext } from "../../AppContext";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function SelectAllocRound({ singleAllocRound }) {
  const { allocRoundContext, setAllocRoundContext } =
    useContext(AllocRoundContext);
  const appContext = useContext(AppContext);

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

  const setAllocRound = (allocRoundObj) => {
    // console.log("allocRoundId 456: " + allocRoundId);
    // appContext.allocRoundId = allocRoundObj.id; // Works now! Updating app context.
    // appContext.allocRoundName = allocRoundObj.name; // Now using AllocRoundContext
    localStorage.setItem("allocRoundId", allocRoundObj.id);
    localStorage.setItem("allocRoundName", allocRoundObj.name);
    setAllocRoundContext({
      allocRoundId: allocRoundObj.id,
      allocRoundName: allocRoundObj.name,
    });
  };

  const allocationSelection = () => {
    // call function to set alloc round here
    setAllocRound(singleAllocRound);

    setAlertOptions({
      severity: "success",
      title: "Success!",
      message: `Alloc round ${singleAllocRound.id} - ${singleAllocRound.name} selected.`,
    });
    setAlertOpen(true);
  };

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
        className="greenButton"
        onClick={confirmAllocationSelection}
      >
        Pick this allocation
      </Button>
    </div>
  );
}
