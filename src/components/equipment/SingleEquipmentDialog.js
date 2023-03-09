import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

export default function SingleEquipmentDialog(props) {
  const {
    open,
    setOpen,
    singleEquipment,
    setSingleEquipment,
    getAllEquipment,
  } = props;

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle>{singleEquipment?.name}</DialogTitle>
        <DialogContent>ID: {singleEquipment?.id}</DialogContent>
        <DialogContent>Name: {singleEquipment?.name}</DialogContent>
        <DialogContent>
          Priority: {singleEquipment?.equipmentPriority}
        </DialogContent>
        <DialogContent>
          Description: {singleEquipment?.description}
        </DialogContent>
      </Dialog>
    </div>
  );
}
