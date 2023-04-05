import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import {
  Dialog,
  DialogContent,
  //DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { AppContext } from "../../AppContext";
import DeleteAllocRound from "./DeleteAllocRound";
import EditAllocRound from "./EditAllocRound";

export default function AllocRoundDetails(props) {
  const {
    open,
    setOpen,
    singleAllocRound,
    getAllAllocRounds,
    setAllocRoundId,
    setSingleAllocRound,
  } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is alert title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const appContext = useContext(AppContext);

  const handleClose = (allocRoundId) => {
    setOpen(false);
  };

  const setAllocRound = (allocRoundId) => {
    //console.log ("allocRoundId 456: " +allocRoundId);
    appContext.allocRoundId = allocRoundId; // Works now! Updating app context.
    setAllocRoundId(allocRoundId); // Notifying grangrangranparent. Updating component state
    setOpen(false);
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
    setOpen(false);
  };

  const confirmAllocationSelection = () => {
    setDialogOptions({
      title: `Are you sure you want to change to ${singleAllocRound.id}?`,
      content: `Press continue to choose alloc round ${singleAllocRound.id} from the listing.`,
    });
    setDialogOpen(true);
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog open={open} onClose={handleClose} width="400px">
        <DialogTitle id="dialog-title">{singleAllocRound?.name}</DialogTitle>
        <DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          />
          <EditAllocRound
            singleAllocRound={singleAllocRound}
            getAllAllocRounds={getAllAllocRounds}
            setSingleAllocRound={setSingleAllocRound}
          />
          <DeleteAllocRound
            singleAllocRound={singleAllocRound}
            getAllAllocRounds={getAllAllocRounds}
            setOpen={setOpen}
          />
          <Grid
            container
            spacing={1}
            column={14}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            padding={2}
          >
            <Grid item s={6}>
              <Typography variant="subtitle1">
                Name:&nbsp;
                {singleAllocRound?.name}
              </Typography>
            </Grid>
            <Grid item s={6}>
              <Typography variant="subtitle1">
                Description:&nbsp;
                {singleAllocRound?.description}
              </Typography>
            </Grid>
            <Grid item s={6}>
              <Typography variant="subtitle1">
                Last modified:&nbsp;
                {singleAllocRound?.lastModified}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <ConfirmationDialog
          dialogOpen={dialogOpen}
          dialogOptions={dialogOptions}
          setDialogOpen={setDialogOpen}
          submit={allocationSelection}
        />
        <Button
          variant="contained"
          color="red"
          style={{ color: "white" }}
          onClick={confirmAllocationSelection}
        >
          Pick this allocation
        </Button>
      </Dialog>
    </div>
  );
}
