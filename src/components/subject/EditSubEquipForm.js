import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import Radio from "@mui/material/Radio";

export default function EditSubEquipForm(props) {
  const { formik, equipmentPriorityList } = props;

  const [open, setOpen] = useState(false);
  const [equipPriority, setEquipPriority] = useState(0);

  /* Here we look for the priority of the equipment selected in select,
  so that the user can see what the equipment's default priority value is */
  useEffect(() => {
    const prio = equipmentPriorityList.find((obj) => {
      return obj.id === formik.values.equipmentId;
    });

    if (prio?.equipmentPriority) {
      setEquipPriority(prio.equipmentPriority);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipmentPriorityList]);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={{ maxWidth: "85px", margin: "5px" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          {/* formik.initialValues?.name} Here ? checks if the name attribute can be found in the initialValues ​​object, if not found it returns the value null and does not crash */}
          <DialogTitle>Edit: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container variant="sibaGridEdit" spacing={3} column={3}>
                <Grid item xs={12}>
                  <Typography sx={{ marginBottom: 2 }}>
                    Default value for priority: {equipPriority}
                  </Typography>
                  <TextField
                    error={
                      formik.touched.priority && formik.errors.priority
                        ? true
                        : false
                    }
                    name="priority"
                    label="Prioriteetti"
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
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
            <Button
              variant="contained"
              color="red"
              onClick={() => {
                setOpen(false);
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
              Edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
