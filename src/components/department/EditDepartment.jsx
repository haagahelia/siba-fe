import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateEditDepartment";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";
import Logger from "../../logger/logger";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function EditDepartment({
  singleDepartment,
  setSingleDepartment,
  getAllDepartments,
}) {
  const [editOpen, setEditOpen] = useState(false);
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...singleDepartment,
      description:
        singleDepartment.description === null
          ? ""
          : singleDepartment.description,
    },
    validateOnChange: true,
    validate,
    onSubmit: (values) => {
      Logger.debug("edit department values:", values);
      setDialogOptions({
        title: `Are you sure you want to edit ${values.name}?`,
        content: `Press continue to save ${values.name} new information.`,
      });
      setDialogOpen(true);
    },
  });

  const submitEdits = async (submitValues) => {
    submitValues.name = capitalizeFirstLetter(submitValues.name);
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
        submitValues={formik.values}
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
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogContent>
            <Grid
              container
              variant="sibaGridEdit"
              direction="column"
              spacing={3}
              column={7}
            >
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  fullWidth
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  name="name"
                  placeholder="Name..."
                  label="Department name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : null
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <TextField
                  fullWidth
                  error={
                    formik.touched.description && formik.errors.description
                      ? true
                      : false
                  }
                  name="description"
                  label="Description"
                  placeholder="Some description..."
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  helperText={
                    formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : null
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                setEditOpen(false);
                formik.resetForm();
              }}
              variant="contained"
              className="redButton"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                setEditOpen(false);
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
