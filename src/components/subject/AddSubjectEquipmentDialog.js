import React, { useState } from "react";
import {
  Button,
  Grid,
  FormHelperText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  RadioGroup,
} from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormik } from "formik";
import dao from "../../ajax/dao";
import FormLabel from "@mui/material/FormLabel";

export default function AddSubjectEquipmentForm(props) {
  const {
    equipmentList,
    data,
    addSubjectEquipment,
    handleChange,
    formik,
    values,
    setInitialSubEquip,
    initialSubEquip,
  } = props;
  //console.log("equipProps", props);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        onClick={() => {
          setOpen(true);
        }}
      >
        Lisää varuste
      </Button>
      <Dialog open={open}>
        <DialogTitle> {data?.subjectName}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                spacing={5}
                column={3}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                padding={2}
              >
                <Grid item sx={12}>
                  <FormControl sx={{ minWidth: 225 }}>
                    <InputLabel>Varuste</InputLabel>
                    <Select
                      name="equipmentId"
                      onChange={formik.handleChange("equipmentId")}
                      value={formik.values.equipmentId}
                      onBlur={formik.handleBlur("equipmentId")}
                    >
                      {equipmentList.map((value) => {
                        return (
                          <MenuItem key={value.id} value={value.id}>
                            {value.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sx={12}>
                  <TextField
                    name="priority"
                    label="Prioriteetti"
                    variant="outlined"
                    value={formik.values.priority}
                    onChange={formik.handleChange("priority")}
                    onBlur={formik.handleBlur("priority")}
                  />
                </Grid>
                <Grid item sx={12}>
                  <FormControl>
                    <FormLabel>Varusteen pakollisuus</FormLabel>
                    <RadioGroup
                      defaultValue="Pakollinen"
                      name="obligatory"
                      value={formik.values.obligatory}
                      onChange={formik.handleChange("obligatory")}
                      onBlur={formik.handleBlur("obligatory")}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Pakollinen"
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Ei pakollinen"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Peruuta
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={() => {
                setInitialSubEquip(values);
                console.log("Any values on submit", initialSubEquip);
                setOpen(false);
              }}
            >
              Lisää
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
