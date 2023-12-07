import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import BuildingInputField from "./BuildingInputField";
import useTheme from "@mui/material/styles/useTheme";

export default function EditBuildingForm({ formik }) {
  const [open, setOpen] = useState(false);

  const theme= useTheme();

  return (
    <div>
      <Button
        variant="contained"
        style={theme.components.MuiButton.editbutton}
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          {/* formik.initialValues?.name} Here ? checks
              if the name attribute can be found
              in the initialValues object,
              if not found returns undefinef and does not crash */}
          <DialogTitle>Edit: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <Grid
              container
              variant="sibaGridEdit"
              direction="column"
              spacing={3}
              column={7}
            >
              <BuildingInputField formik={formik} />
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-evenly" }}>
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
