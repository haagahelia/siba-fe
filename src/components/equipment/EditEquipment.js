import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import dao from "../../ajax/dao";

export default function EditEquipment(props) {
  const {
    singleEquipment,
    setSingleEquipment,
    getAllEquipments,
    open,
    setOpen,
  } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [equipment, setEquipment] = useState({
    id: singleEquipment?.id,
    name: singleEquipment?.name,
    priority: singleEquipment?.equipmentPriority,
    description: singleEquipment?.description,
  });

  const submitEdits = async () => {
    let result = await dao.editEquipment(equipment);
    if (!result) {
      alert("Something went wrong");
    } else {
      alert(`Equipment ${equipment.name} updated`);
      setEditOpen(false);
      setOpen(false);
      getAllEquipments();
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={{ color: "white" }}
        onClick={() => {
          setEditOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit equipment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid
              container
              spacing={3}
              column={7}
              direction="column"
              justifyContent="center"
              alignItems="center"
              padding={2}
            >
              <Grid item xs={12}>
                <TextField
                  name='Equipment'
                  label='Equipment'
                  defaultValue={singleEquipment?.name}
                  onChange={(e) =>
                    setEquipment({ ...equipment, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='Priority'
                  label='Priority'
                  defaultValue={singleEquipment?.equipmentPriority}
                  onChange={(e) =>
                    setEquipment({ ...equipment, priority: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='Description'
                  label='Description'
                  defaultValue={singleEquipment?.description}
                  onChange={(e) =>
                    setEquipment({ ...equipment, description: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button onClick={submitEdits}>Submit</Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
