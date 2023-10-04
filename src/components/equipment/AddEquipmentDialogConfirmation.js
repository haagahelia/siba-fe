import dao from "../../ajax/dao";
import ValidateAddEquipment from "../../validation/ValidateAddEquipment";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddEquipmentDialogConfirmation({
  open,
  setOpen,
  equipment,
  setEquipment,
  getAllEquipments,
}) {
  const addSingleEquipment = async () => {
    const validation = ValidateAddEquipment(equipment);
    if (validation) {
      alert(Object.values(validation));
      return;
    }
    const success = await dao.postNewEquipment(equipment);
    if (!success) {
      alert("Something went wrong!");
    } else {
      setEquipment({
        name: "",
        priority: "",
        description: "",
        isMovable: "",
      });
      getAllEquipments();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Are you sure you want to add {equipment?.name} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          By clicking continue, {equipment?.name} will be added to equipments.
        </DialogContentText>
      </DialogContent>
      <Button variant="contained" color="red" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => addSingleEquipment()}
      >
        Continue
      </Button>
    </Dialog>
  );
}
