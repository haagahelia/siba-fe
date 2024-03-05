import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function AddDepartmentPlannerForm({
  departmentSelectList,
  singleUser,
  formik,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add DepartmentPlanner
      </Button>
      <Dialog open={open}>
        <DialogTitle>{singleUser?.email}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                variant="sibaGridAddFormInDialog"
                spacing={1}
                width={250}
                column={3}
                direction="column"
              >
                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel>Department</InputLabel>
                    <Select
                      sx={{ minWidth: "200px", textAlign: "center" }}
                      error={
                        formik.touched.id && formik.errors.id ? true : false
                      }
                      name="id"
                      onChange={formik.handleChange("departmentId")}
                      value={formik.values?.id}
                      onBlur={formik.handleBlur("departmentId")}
                    >
                      {departmentSelectList.map((value) => (
                        <MenuItem key={value.id} value={value.id}>
                          {value.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {formik.touched.id && formik.errors.id}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className="redButton"
              onClick={() => {
                setOpen(false);
                formik.resetForm();
              }}
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
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
