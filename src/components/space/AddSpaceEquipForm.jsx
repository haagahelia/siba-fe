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
import useTheme from "@mui/material/styles/useTheme";

export default function AddSpaceEquipForm({
  equipmentSelectList,
  singleSpace,
  formik,
}) {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add equipment
      </Button>
      <Dialog open={open}>
        {/* formik.singleSubject?.subjectName} Here ? checks
            whether the singleSubject object has the subjectName attribute,
            if not found it returns the value null and does not crash */}
        <DialogTitle>{singleSpace?.name}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                variant="sibaGridAddFormInDialog"
                spacing={1}
                column={3}
                direction="column"
              >
                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel>Equipment</InputLabel>
                    <Select
                      error={
                        formik.touched.equipmentId && formik.errors.equipmentId
                          ? true
                          : false
                      }
                      name="equipmentId"
                      onChange={formik.handleChange("equipmentId")}
                      value={formik.values?.equipmentId}
                      onBlur={formik.handleBlur("equipmentId")}
                    >
                      {equipmentSelectList.map((value) => {
                        return (
                          <MenuItem key={value.id} value={value.id}>
                            {value.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {formik.touched.equipmentId && formik.errors.equipmentId}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              style={theme.components.MuiButton.redbutton}
              onClick={() => {
                setOpen(false);
                setEquipPriority(0);
                // Let's reset the form if you press cancel
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
