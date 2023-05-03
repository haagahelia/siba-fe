import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent } from "@mui/material";

export default function EditSettingForm(props) {
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
          <DialogTitle>Edit: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <Grid container variant="sibaGridEdit" spacing={3} column={7}>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  name="name"
                  label="Setting name"
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
                  label="Description"
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
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.numberValue && formik.errors.numberValue
                      ? true
                      : false
                  }
                  name="numberValue"
                  label="numberValue"
                  defaultValue={formik.initialValues?.numberValue}
                  variant="outlined"
                  value={formik.values?.numberValue}
                  onChange={formik.handleChange("numberValue")}
                  onBlur={formik.handleBlur("numberValue")}
                  helperText={
                    formik.touched.numberValue && formik.errors.numberValue
                      ? formik.errors.numberValue
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.textValue && formik.errors.textValue
                      ? true
                      : false
                  }
                  name="textValue"
                  label="textValue"
                  defaultValue={formik.initialValues?.textValue}
                  variant="outlined"
                  value={formik.values?.textValue}
                  onChange={formik.handleChange("textValue")}
                  onBlur={formik.handleBlur("textValue")}
                  helperText={
                    formik.touched.numberValue && formik.errors.textValue
                      ? formik.errors.textValue
                      : null
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
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
