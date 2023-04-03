import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditDepartment";

function AddDepartment(props) {
  const { getAllDepartments } = props;
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
  const AddDepartment = async () => {
    let validation = validate(department);
    if (!validation) {
      alert(Object.values(validation));
      return;
    }
    let success = await dao.AddDepartment(department);
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
              <Button variant="contained" onClick={AddDepartment}>
                Confirm
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default AddDepartment;
