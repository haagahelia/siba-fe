import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function EditEquipmentForm({ formik }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        className="editButton"
        onClick={() => setEditOpen(true)}
      >
        Edit
      </Button>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Edit equipment</DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={3}
              column={7}
              direction="column"
              variant="sibaGridEdit"
            >
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  name="Equipment"
                  label="Equipment"
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
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  error={
                    formik.touched.priority && formik.errors.priority
                      ? true
                      : false
                  }
                  type="number"
                  name="Priority"
                  label="Priority"
                  variant="outlined"
                  value={formik.values.priority}
                  onChange={formik.handleChange("priority")}
                  onBlur={formik.handleBlur("priority")}
                  helperText={
                    formik.touched.priority && formik.errors.priority
                      ? formik.errors.priority
                      : null
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  error={
                    formik.touched.description && formik.errors.description
                      ? true
                      : false
                  }
                  name="Description"
                  label="Description"
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
    </>
  );
}
