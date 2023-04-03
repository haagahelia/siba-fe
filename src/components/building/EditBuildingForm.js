import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent } from "@mui/material";
import BuildingInputField from "./BuildingInputField";

export default function EditBuildingForm(props) {
  const { formik } = props;

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={{ color: "white" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          {/* formik.initialValues?.subjectName} Here ? checks if the subjectName attribute can be found in the initialValues ​​object, if not found returns null and does not crash */}
          <DialogTitle sx={{ maxWidth: "300px" }}>
            Edit: {formik.initialValues?.name}
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={3}
              column={7}
              direction="column"
              justifyContent="center"
              alignItems="center"
              padding={2}
            >
              <BuildingInputField formik={formik} />
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
            <Button
              onClick={() => {
                setOpen(false);
                // Let's reset the form if you press cancel
                formik.resetForm();
              }}
              variant="contained"
              color="red"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{ color: "white" }}
              onClick={() => {
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}