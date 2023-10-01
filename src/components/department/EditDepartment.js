import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditDepartment";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function EditDepartment({
  singleDepartment,
  getAllDepartments,
  setOpen,
}) {
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
            <Grid container variant="sibaGridEdit" spacing={3} column={7}>
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
            <Button onClick={submitEdits} variant="contained">
              Submit
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
