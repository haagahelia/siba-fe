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

export default function AllocRoudDetails(props) {
  const { open, setOpen, singleAllocRoud } = props;
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
    appContext.allocRoundId = allocRoundId; // Does not work
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
          setAllocRound(singleAllocRoud.id);
        }}
        width="400px"
      >
        <DialogTitle id="dialog-title">
          {singleAllocRoud?.AllocRoudName}
        </DialogTitle>
        <DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
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
                {singleAllocRoud?.name}
              </Typography>
            </Grid>
            <Grid item s={6}>
              <Typography variant="subtitle1">
                Description:&nbsp;
                {singleAllocRoud?.description}
              </Typography>
            </Grid>
            <Grid item s={6}>
              <Typography variant="subtitle1">
                Last modified:&nbsp;
                {singleAllocRoud?.lastModified}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1">
            Click to set as active allocRound!
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
