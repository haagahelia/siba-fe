import dao from "../../ajax/dao";
import ValidateAddSpace from "../../validation/ValidateAddSpace";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddSpaceDialogConfirmation({
  open,
  setOpen,
  space,
  setSpace,
  getAllSpaces,
}) {
  const addSingleSpace = async () => {
    const validation = await ValidateAddSpace(space);
    if (validation) {
      alert(Object.values(validation));
      return;
    }
    const success = await dao.postNewSpace(space);
    if (!success) {
      alert("Something went wrong!");
    } else {
      setSpace({
        name: "",
        area: "0",
        personLimit: "0",
        buildingId: "400",
        availableFrom: "",
        availableTo: "",
        classesFrom: "",
        classesTo: "",
        inUse: "",
        spaceTypeId: "",
      });
      getAllSpaces();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Are you sure you want to add {space?.name} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          By clicking continue, {space?.name} will be added to spaces.
        </DialogContentText>
      </DialogContent>
      <Button
        variant="contained"
        className="redButton"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
      <Button variant="contained" onClick={() => addSingleSpace()}>
        Continue
      </Button>
    </Dialog>
  );
}
