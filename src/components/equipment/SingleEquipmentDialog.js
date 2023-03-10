import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";

export default function SingleEquipmentDialog(props) {
  const {
    open,
    setOpen,
    singleEquipment,
    setSingleEquipment,
    getAllEquipments,
  } = props;

  return (
    <>
      <Dialog open={props.open} onClose={() => setOpen(false)}>
        <DialogTitle id="dialog-title">Equipment Info</DialogTitle>
        <DialogContent>id: {singleEquipment?.id}</DialogContent>
        <DialogContent>Name: {singleEquipment?.name}</DialogContent>
        <DialogContent>
          {" "}
          Priority: {singleEquipment?.equipmentPriority}
        </DialogContent>
        <DialogContent>
          Description: {singleEquipment?.description}
        </DialogContent>
      </Dialog>
    </>
  );
}
