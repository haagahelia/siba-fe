import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditDepartment";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function EditDepartment({
  singleDepartment,
  setSingleDepartment,
  getAllDepartments,
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });

  const theme = useTheme();

  const submitEdits = async (submitValues) => {
    const validation = validate(submitValues);
    if (Object.values(validation).length !== 0) {
      alert(Object.values(submitValues));
    } else {
      const success = await dao.editDepartment(submitValues);
      if (!success) {
        setAlertOptions({
          severity: "error",
          title: "Error",
          message: "Something went wrong - please try again later.",
        });
      } else {
        setAlertOptions({
          severity: "success",
          title: "Success!",
          message: `${submitValues.name} updated successfully.`,
        });
        setSingleDepartment(submitValues);
      }
      setAlertOpen(true);
      setEditOpen(false);
      getAllDepartments();
    }
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={submitEdits}
        submitValues={department}
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
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-evenly" }}>
          <Button
            onClick={() => {
              setEditOpen(false);
            }}
            variant="contained"
            color="red"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setEditOpen(false);
              setDialogOptions({
                title: `Are you sure you want to edit ${department.name}?`,
                content: `Press continue to save ${department.name} new information.`,
              });
              setDialogOpen(true);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
