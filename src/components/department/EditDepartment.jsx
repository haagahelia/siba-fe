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
import useTheme from "@mui/material/styles/useTheme";
import AlertBox from "../common/AlertBox";

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
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const theme = useTheme();

  const submitEdits = async () => {
    const validation = validate(department);
    if (Object.values(validation).length !== 0) {
      alert(Object.values(validation));
    } else {
      const result = await dao.editDepartment(department);
      if (!result) {
        setAlertOptions({
          severity: "error",
          title: "Error",
          message: "Something went wrong - please try again later.",
        });
        setAlertOpen(true);
        return;
      } else {
        setAlertOptions({
          severity: "success",
          title: "Success!",
          message: `${department.name} updated successfully.`,
        });
        setAlertOpen(true);
        setEditOpen(false);
        setTimeout(() => {
          setOpen(false);
        }, 1000);
        getAllDepartments();
      }
    }
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Button
        variant="contained"
        style={theme.components.MuiButton.editbutton}
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
