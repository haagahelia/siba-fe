import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
                    error={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    name="name"
                    label="The name of the allocation round"
                    defaultValue={formik.initialValues?.name}
                    variant="outlined"
                    value={formik.values?.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.description && formik.errors.description
                        ? true
                        : false
                    }
                    name="description"
                    label="Description "
                    defaultValue={formik.initialValues?.description}
                    variant="outlined"
                    value={formik.values?.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    helperText={
                      formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : null
                    }
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
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
