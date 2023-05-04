import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/material";
import dao from "../../ajax/dao";
import ValidateAddEquipment from "../../validation/ValidateAddEquipment";

export default function AddEquipmentDialogConfirmation(props) {
  const { open, setOpen, equipment, setEquipment, getAllEquipments } = props;

  const addSingleEquipment = async () => {
    let validation = ValidateAddEquipment(equipment);
    if (validation) {
      alert(Object.values(validation));
      return;
    }
    let success = await dao.postNewEquipment(equipment);
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
