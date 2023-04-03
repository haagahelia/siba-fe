import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { DialogContent, DialogContentText } from "@mui/material";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditDepartment";

export default function EditDepartment(props) {
  const { singleDepartment, getAllDepartments, setOpen } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [department, setDepartment] = useState({
    id: singleDepartment?.id,
    name: singleDepartment?.name,
    description: singleDepartment?.description,
  });

  const submitEdits = async () => {
    let validation = validate(department);
    if (Object.values(validation).length !== 0) {
      alert(Object.values(validation));
    } else {
      let result = await dao.editDepartment(department);
      if (!result) {
        alert("Something went wrong");
      } else {
        alert(`Department ${department.name} updated`);
        setEditOpen(false);
        setOpen(false);
        getAllDepartments();
      }
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
        <DialogTitle>Edit Department</DialogTitle>
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
                  name="Department"
                  label="Department"
                  defaultValue={singleDepartment?.name}
                  onChange={(e) =>
                    setDepartment({ ...department, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Description"
                  label="Description"
                  defaultValue={singleDepartment?.description}
                  onChange={(e) =>
                    setDepartment({
                      ...department,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Button
              onClick={submitEdits}
              variant="contained"
              style={{ color: "white" }}
            >
              Submit
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
