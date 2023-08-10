import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { DialogContent } from "@mui/material";
import dao from "../../ajax/dao";
import ValidateEditEquipment from "../../validation/ValidateEditEquipment";
import Logger from "../../logger/logger";

export default function EditEquipment(props) {
  Logger.logPrefix = "SingleEquipmentDialog";
  const {
    singleEquipment,
    setSingleEquipment,
    getAllEquipments,
    /* open, */
    setOpen,
  } = props;

  const [editOpen, setEditOpen] = useState(false);

  const submitEdits = async () => {
    Logger.debug(
      `Submitting edits for equipment: ${JSON.stringify(singleEquipment)}`,
    );
    let validation = ValidateEditEquipment(singleEquipment);
    if (Object.values(validation).length !== 0) {
      alert(Object.values(validation));
    } else {
      let result = await dao.editEquipment(singleEquipment);
      if (!result) {
        alert("Something went wrong");
      } else {
        alert(`Equipment ${singleEquipment.name} updated`);
        setEditOpen(false);
        setOpen(false);
        setSingleEquipment({
          id: "",
          name: "",
          priority: "",
          description: "",
        });
        getAllEquipments();
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setEditOpen(true)}
      >
        Edit
      </Button>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit equipment</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} column={7} direction="column">
            <Grid item xs={12}>
              <TextField
                name="Equipment"
                label="Equipment"
                defaultValue={singleEquipment?.name}
                onChange={(e) =>
                  setSingleEquipment({
                    ...singleEquipment,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="Priority"
                label="Priority"
                type="number"
                defaultValue={singleEquipment?.priority}
                onChange={(e) =>
                  setSingleEquipment({
                    ...singleEquipment,
                    priority: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="Description"
                label="Description"
                defaultValue={singleEquipment?.description}
                onChange={(e) =>
                  setSingleEquipment({
                    ...singleEquipment,
                    description: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Button onClick={submitEdits} variant="contained">
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
