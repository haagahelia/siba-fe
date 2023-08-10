import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AllocRoundInputField from "./AllocRoundInputField";

export default function EditAllocRoundForm(props) {
  const { formik } = props;

  const [open, setOpen] = useState(false);

  const theme = useTheme();

  return (
    <div>
      <Button //theme button yellow
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
          {/* formik.initialValues?.name} Here ? checks if the AllocRoundName attribute can be found in the initialValues ​​object, if not found returns null and does not crash */}
          <DialogTitle>Edit: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <Grid
              container
              variant="sibaGridEdit"
              direction="column"
              spacing={3}
              column={7}
            >
              <AllocRoundInputField formik={formik} />
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-evenly" }}>
            <Button //theme button red
              onClick={() => {
                setOpen(false);
                // Let's reset the form if you press cancel
                formik.resetForm();
              }}
              variant="contained"
              style={theme.components.MuiButton.redbutton}
            >
              Cancel
            </Button>
            <Button //theme button green
              type="submit"
              variant="contained"
              style={theme.components.MuiButton.greenbutton}
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
