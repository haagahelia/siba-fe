import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";

export default function ConfirmationDialog(props) {
  const {
    dialogOpen,
    dialogOptions,
    setDialogOpen,
    confirmfunction,
    functionparam,
  } = props;

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

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
          {" "}
          <Button variant="contained" color="error" onClick={handleClose}>Peruuta</Button>
          <Button
            autoFocus
            variant="contained"
            color="success"
            onClick={() => {
              // console.log(functionparam);
              if (functionparam) {
                confirmfunction(functionparam);
              } else {
                confirmfunction();
              }
              handleClose();
            }}
          >
            Jatka
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
