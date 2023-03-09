import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import {
  Dialog,
  DialogContent,
  //DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";
import AlertBox from "../common/AlertBox";
import { AppContext } from "../../AppContext";
import DeleteAllocRound from "./DeleteAllocRound";

export default function AllocRoudDetails(props) {
  const {
    open,
    setOpen,
    singleAllocRound,
    getAllAllocRounds,
    setAllocRoundId,
  } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions] = useState({
    title: "This is alert title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  let appContext = useContext(AppContext);

  const handleClose = (allocRoundId) => {
    setOpen(false);
  };

  const setAllocRound = (allocRoundId) => {
    //console.log ("allocRoundId 456: " +allocRoundId);
    appContext.allocRoundId = allocRoundId; // Works now! Updating app context.
    setAllocRoundId(allocRoundId); // Notifying grangrangranparent. Updating component state
    setOpen(false);
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        onClick={() => {
          setAllocRound(singleAllocRound.id);
        }}
        width="400px"
      >
        <DialogTitle id="dialog-title">
          {singleAllocRound?.AllocRoundName}
        </DialogTitle>
        <DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
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
      </Dialog>
    </div>
  );
}