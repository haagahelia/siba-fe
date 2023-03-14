import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";
import { Button } from "@mui/material";
import dao from "../../ajax/dao";

export default function AddEquipmentDialogConfirmation(props) {
  const { open, setOpen, equipment, setEquipment, getAllEquipments } = props;

  const addSingleEquipment = async () => {
    let success = await dao.postNewEquipment(equipment);
    if (!success) {
      alert("Something went wrong!");
    } else {
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
      <Button
        variant="contained"
        color="red"
        style={{ color: "white" }}
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="success"
        style={{ color: "white" }}
        onClick={() => addSingleEquipment()}
      >
        Continue
      </Button>
    </Dialog>
  );
}
