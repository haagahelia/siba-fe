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
        <DialogContent>{singleEquipment?.id}</DialogContent>
        <DialogContent>{singleEquipment?.name}</DialogContent>
        <DialogContent>{singleEquipment?.equipmentPriority}</DialogContent>
        <DialogContent>{singleEquipment?.description}</DialogContent>
      </Dialog>
    </div>
  );
}
