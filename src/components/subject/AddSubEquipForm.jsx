import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function AddSubEquipForm({
  equipmentSelectList,
  singleSubject,
  formik,
}) {
  const [open, setOpen] = useState(false);
  const [equipPriority, setEquipPriority] = useState(0);

  /* Here we look for the priority of the equipment selected in select,
     so that the user can see what the equipment's default priority value is */
  useEffect(() => {
    const prio = equipmentSelectList.find((obj) => {
      return obj.id === formik.values.equipmentId;
    });
    if (prio?.priority) {
      setEquipPriority(prio.priority);
      // Sets the default priority value directly in the input field
      formik.setValues({ ...formik.values, priority: prio.priority });
    }
  }, [formik.values.equipmentId]);

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
        <DialogTitle>{singleSubject?.name}</DialogTitle>
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
                <Grid item xs={12}>
                  <Typography>
                    Priority default value: {equipPriority}
                  </Typography>
                  <TextField
                    error={
                      formik.touched.priority && formik.errors.priority
                        ? true
                        : false
                    }
                    name="priority"
                    label="Priority"
                    variant="outlined"
                    type="number"
                    value={formik.values.priority}
                    onChange={formik.handleChange("priority")}
                    onBlur={formik.handleBlur("priority")}
                    helperText={
                      formik.touched.priority && formik.errors.priority
                        ? formik.errors.priority
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>Mandatority of the equipment</FormLabel>
                    <RadioGroup
                      name="obligatory"
                      value={formik.values.obligatory}
                      onChange={formik.handleChange("obligatory")}
                      onBlur={formik.handleBlur("obligatory")}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Mandatory"
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Not mandatory"
                      />
                    </RadioGroup>
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
                setEquipPriority(0);
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
