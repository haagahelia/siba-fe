import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  RadioGroup,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export default function AddSubEquipForm(props) {
  const { equipmentSelectList, singleSubject, formik } = props;
  const [open, setOpen] = useState(false);
  const [equipPriority, setEquipPriority] = useState(0);

  /* Here we look for the priority of the equipment selected in select,
  so that the user can see what the equipment's default priority value is */
  useEffect(() => {
    const prio = equipmentSelectList.find((obj) => {
      return obj.id === formik.values.equipmentId;
    });
    if (prio?.equipmentPriority) {
      setEquipPriority(prio.equipmentPriority);
      // Sets the default priority value directly in the input field
      formik.setValues({ ...formik.values, priority: prio.equipmentPriority });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.equipmentId]);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add equipment
      </Button>
      <Dialog open={open}>
        {/* formik.singleSubject?.subjectName} Here ? checks whether the singleSubject object has the subjectName attribute, if not found it returns the value null and does not crash */}
        <DialogTitle>{singleSubject?.subjectName}</DialogTitle>
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
              color="red"
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
