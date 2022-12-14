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
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { globalTheme } from "../styles/theme";
import Radio from "@mui/material/Radio";

export default function EditSubEquipForm(props) {
  const { formik, equipmentPriorityList, submitValues, setInitialEquipValues } =
    props;

  const [open, setOpen] = useState(false);
  const [equipPriority, setEquipPriority] = useState(0);

  /* Tässä etsitään selectistä valitun varusteen prioriteettia, 
  jotta käyttäjä näkee mikä varusteen oletus prioriteetti arvo on */
  useEffect(() => {
    const prio = equipmentPriorityList.find((obj) => {
      return obj.id === formik.values.equipmentId;
    });

    if (prio?.equipmentPriority) {
      setEquipPriority(prio.equipmentPriority);
    }
  }, [equipmentPriorityList]);

  return (
    <div>
      <ThemeProvider theme={globalTheme}>
        <Button
          variant="contained"
          color="secondary"
          style={{ color: "white", maxWidth: "85px", margin: "5px" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Muokkaa
        </Button>
      </ThemeProvider>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          {/* formik.initialValues?.name} Tässä ? katsoo löytyykö initialValues objektista attribuuttia name, jos ei löydy palauttaa arvon null eikä kaadu */}
          <DialogTitle>Muokkaa: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                spacing={3}
                column={3}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                padding={2}
              >
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
                  // Lomake nollantuu ja saa uude initialvaluet
                  formik.resetForm(setInitialEquipValues(submitValues));
                }}
              >
                Muokkaa
              </Button>
            </ThemeProvider>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
