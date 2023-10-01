import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog({
  dialogOpen,
  dialogOptions,
  setDialogOpen,
  submit,
  submitValues,
}) {
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
