import React, { useState } from "react";
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
} from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ThemeProvider } from "@mui/material";
import { globalTheme } from "../styles/theme";

export default function AddSubjectEquipmentDialog(props) {
  const { equipmentList, data, formik, values, setInitialSubEquip } = props;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ThemeProvider theme={globalTheme}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Lisää varuste
      </Button>
      </ThemeProvider>
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
                      {equipmentList.map((value) => {
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
                <Grid item sx={12}>
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
                  ></TextField>
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
            <ThemeProvider theme={globalTheme}>
            <Button
              variant="contained"
              color="red"
              style={{color: "white"}}
              onClick={() => {
                setOpen(false);
              }}
            >
              Peruuta
            </Button>
            </ThemeProvider>
            <ThemeProvider theme={globalTheme}>
            <Button
              type="submit"
              style={{color: "white"}}
              variant="contained"
              onClick={() => {
                setInitialSubEquip(values);
                setOpen(false);
              }}
            >
              Lisää
            </Button>
            </ThemeProvider>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
