import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function EditUserForm({ formik }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle sx={{ maxWidth: "300px" }}>
            Edit: {formik.initialValues?.email}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container variant="sibaGridEdit" spacing={3} column={7}>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    name="email"
                    label="User email"
                    defaultValue={formik.initialValues?.email}
                    variant="outlined"
                    value={formik.values?.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.isAdmin && formik.errors.isAdmin
                        ? true
                        : false
                    }
                    name="isAdmin"
                    label="isAdmin"
                    defaultValue={formik.initialValues?.isAdmin}
                    variant="outlined"
                    value={formik.values?.isAdmin}
                    onChange={formik.handleChange("isAdmin")}
                    onBlur={formik.handleBlur("isAdmin")}
                    helperText={
                      formik.touched.isAdmin && formik.errors.isAdmin
                        ? formik.errors.isAdmin
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.isPlanner && formik.errors.isPlanner
                        ? true
                        : false
                    }
                    name="isPlanner"
                    label="isPlanner"
                    defaultValue={formik.initialValues?.isPlanner}
                    variant="outlined"
                    value={formik.values?.isPlanner}
                    onChange={formik.handleChange("isPlanner")}
                    onBlur={formik.handleBlur("isPlanner")}
                    helperText={
                      formik.touched.isPlanner && formik.errors.isPlanner
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.isStatist && formik.errors.isStatist
                        ? true
                        : false
                    }
                    name="isStatist"
                    label="isStatist"
                    defaultValue={formik.initialValues?.isStatist}
                    variant="outlined"
                    value={formik.values?.isStatist}
                    onChange={formik.handleChange("isStatist")}
                    onBlur={formik.handleBlur("isStatist")}
                    helperText={
                      formik.touched.isStatist && formik.errors.isStatist
                    }
                  />
                </Grid>
              </Grid>
            </DialogContentText>
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
