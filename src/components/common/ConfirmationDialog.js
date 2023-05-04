import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";

export default function ConfirmationDialog(props) {
  const { dialogOpen, dialogOptions, setDialogOpen, submit, submitValues } =
    props;

  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>{dialogOptions.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogOptions.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="red" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            onClick={() => {
              if (submitValues) {
                submit(submitValues);
              } else {
                submit();
              }
              handleClose();
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
