import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditDepartment";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddDepartmentDialogConfirmation({
  open,
  setOpen,
  department,
  setDepartment,
  getAllDepartments,
}) {
  const addSingleDepartment = async () => {
    const validation = validate(department);
    if (!validation) {
      alert(Object.values(validation));
      return;
    }
    const success = await dao.addDepartment(department);
    if (!success) {
      alert("Something went wrong!");
    } else {
      setDepartment({
        name: "",
        description: "",
      });
      getAllDepartments();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        Are you sure you want to add {department?.name}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          By clicking continue, {department?.name} will be added to departments.
        </DialogContentText>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={addSingleDepartment}
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
