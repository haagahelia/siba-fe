import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  ThemeProvider,
} from "@mui/material";
import { globalTheme } from "../styles/theme";

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
          <ThemeProvider theme={globalTheme}>
            <Button
              variant="contained"
              color="red"
              style={{ color: "white" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              autoFocus
              style={{ color: "white" }}
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
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}
