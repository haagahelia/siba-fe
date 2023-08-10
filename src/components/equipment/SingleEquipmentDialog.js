import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import EditEquipment from "./EditEquipment";
import DeleteEquipment from "./DeleteEquipment";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";
import Logger from "../../logger/logger";

export default function SingleEquipmentDialog(props) {
  Logger.logPrefix = "SingleEquipmentDialog";
  const {
    open,
    setOpen,
    singleEquipment,
    setSingleEquipment,
    getAllEquipments,
  } = props;
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
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
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
        <DialogContent>
          Description: {singleEquipment?.description}
        </DialogContent>
      </Dialog>
    </>
  );
}
