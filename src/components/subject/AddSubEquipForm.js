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
import { ThemeProvider } from "@mui/material";
import { globalTheme } from "../styles/theme";

export default function AddSubEquipForm(props) {
  const { equipmentSelectList, singleSubject, formik } = props;
  const [open, setOpen] = useState(false);
  const [equipPriority, setEquipPriority] = useState(0);

  /* Tässä etsitään selectistä valitun varusteen prioriteettia, 
  jotta käyttäjä näkee mikä varusteen oletus prioriteetti arvo on */
  useEffect(() => {
    const prio = equipmentSelectList.find((obj) => {
      return obj.id === formik.values.equipmentId;
    });
    if (prio?.equipmentPriority) {
      setEquipPriority(prio.equipmentPriority);
      // Asettaa oletus prioriteetti arvon suoraan syötekenttään
      formik.setValues({ ...formik.values, priority: prio.equipmentPriority });
    }
  }, [formik.values.equipmentId]);

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
        {/* formik.singleSubject?.subjectName} Tässä ? katsoo löytyykö singleSubject objektista attribuuttia subjectName, jos ei löydy palauttaa arvon null eikä kaadu */}
        <DialogTitle sx={{ maxWidth: "300px" }}>
          {singleSubject?.subjectName}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                spacing={3}
                column={3}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-center"
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
                <Grid item sx={12}>
                  <Typography sx={{ marginBottom: 2 }}>
                    Prioriteetin oletusarvo: {equipPriority}
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
                <Grid item sx={12}>
                  <FormControl>
                    <FormLabel>Varusteen pakollisuus</FormLabel>
                    <RadioGroup
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
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
            <ThemeProvider theme={globalTheme}>
              <Button
                variant="contained"
                color="red"
                style={{ color: "white" }}
                onClick={() => {
                  setOpen(false);
                  setEquipPriority(0);
                  // Nollataan lomake jos painaa peruuta
                  formik.resetForm();
                }}
              >
                Peruuta
              </Button>
              <Button
                type="submit"
                style={{ color: "white" }}
                variant="contained"
                onClick={() => {
                  setOpen(false);
                  setEquipPriority(0);
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
