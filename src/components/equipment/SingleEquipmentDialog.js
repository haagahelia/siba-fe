import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";
import EditEquipment from "./EditEquipment";
import DeleteEquipment from "./DeleteEquipment";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";

export default function SingleEquipmentDialog(props) {
  const {
    open,
    setOpen,
    singleEquipment,
    setSingleEquipment,
    getAllEquipments,
  } = props;
  const { roles, setRoles } = RoleLoggedIn();
  console.log(singleEquipment);
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
