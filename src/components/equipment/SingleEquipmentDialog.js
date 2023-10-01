import { useEffect } from "react";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";
import Logger from "../../logger/logger";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteEquipment from "./DeleteEquipment";
import EditEquipment from "./EditEquipment";

export default function SingleEquipmentDialog({
  open,
  setOpen,
  singleEquipment,
  setSingleEquipment,
  getAllEquipments,
}) {
  Logger.logPrefix = "SingleEquipmentDialog";

  const { roles } = RoleLoggedIn();

  useEffect(() => {
    if (open && singleEquipment) {
      Logger.debug(
        `Rendering SingleEquipmentDialog for equipment: ${JSON.stringify(
          singleEquipment,
        )}`,
      );
    }
  }, [open, singleEquipment]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        getAllEquipments();
      }}
    >
      <DialogTitle id="dialog-title">Equipment Info</DialogTitle>
      {roles.admin === "1" && (
        <DialogActions>
          <EditEquipment
            singleEquipment={singleEquipment}
            setSingleEquipment={setSingleEquipment}
            getAllEquipments={getAllEquipments}
            open={open}
            setOpen={setOpen}
          />
          <DeleteEquipment
            singleEquipment={singleEquipment}
            getAllEquipments={getAllEquipments}
            setOpen={setOpen}
          />
        </DialogActions>
      )}
      <DialogContent>id: {singleEquipment?.id}</DialogContent>
      <DialogContent>Name: {singleEquipment?.name}</DialogContent>
      <DialogContent> Priority: {singleEquipment?.priority}</DialogContent>
      <DialogContent>Description: {singleEquipment?.description}</DialogContent>
    </Dialog>
  );
}
