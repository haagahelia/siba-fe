import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditDepartment";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function AddDepartment({ getAllDepartments }) {
  const [open, setOpen] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [department, setDepartment] = useState({
    name: "",
    description: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setConfirmationDialog(true);
  };
  const inputChanged = (event) => {
    setDepartment({ ...department, [event.target.name]: event.target.value });
  };
  const addDepartment = async () => {
    const validation = validate(department);
    if (!validation) {
      alert(Object.values(validation));
      return;
    }
    const success = await dao.addDepartment(department);
    if (!success) {
      alert("something went wrong!");
    } else {
      setDepartment({ name: "", description: "" });
      getAllDepartments();
      setConfirmationDialog(false);
      setOpen(false);
    }
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Department
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Department</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter department information
          </DialogContentText>
          <TextField
            name="name"
            value={department.name}
            onChange={inputChanged}
            label="Name"
            fullWidth
            sx={{
              marginY: "1rem",
            }}
          />
          <TextField
            name="description"
            value={department.description}
            onChange={inputChanged}
            label="Description"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {confirmationDialog && (
        <Dialog open={confirmationDialog}>
          <DialogContent>
            <DialogContentText>
              Please confirm if you want to add {department.name}
            </DialogContentText>
            <DialogActions>
              <Button
                onClick={() => {
                  setConfirmationDialog(false);
                }}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={addDepartment}>
                Confirm
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
