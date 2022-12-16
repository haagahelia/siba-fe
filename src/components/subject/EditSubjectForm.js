import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, FormHelperText, ThemeProvider } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { globalTheme } from "../styles/theme";

export default function EditSubjectForm(props) {
  const { programSelectList, formik, spaceTypeSelectList } = props;

  const [open, setOpen] = useState(false);

  return (
    <div>
      <ThemeProvider theme={globalTheme}>
        <Button
          variant="contained"
          color="secondary"
          style={{ color: "white" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Muokkaa
        </Button>
      </ThemeProvider>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          {/* formik.initialValues?.subjectName} Tässä ? katsoo löytyykö initialValues objektista attribuuttia subjectName, jos ei löydy palauttaa arvon null eikä kaadu */}
          <DialogTitle sx={{ maxWidth: "300px" }}>
            Muokkaa: {formik.initialValues?.subjectName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                spacing={3}
                column={7}
                direction="column"
                justifyContent="center"
                alignItems="center"
                padding={2}
              >
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.subjectName && formik.errors.subjectName
                        ? true
                        : false
                    }
                    name="subjectName"
                    label="Opetuksen nimi"
                    defaultValue={formik.initialValues?.subjectName}
                    variant="outlined"
                    value={formik.values?.subjectName}
                    onChange={formik.handleChange("subjectName")}
                    onBlur={formik.handleBlur("subjectName")}
                    helperText={
                      formik.touched.subjectName && formik.errors.subjectName
                        ? formik.errors.subjectName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.groupSize && formik.errors.groupSize
                        ? true
                        : false
                    }
                    name="groupSize"
                    label="Ryhmän koko"
                    defaultValue={formik.initialValues?.groupSize}
                    variant="outlined"
                    value={formik.values?.groupSize}
                    onChange={formik.handleChange("groupSize")}
                    onBlur={formik.handleBlur("groupSize")}
                    helperText={
                      formik.touched.groupSize && formik.errors.groupSize
                        ? formik.errors.groupSize
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.groupCount && formik.errors.groupCount
                        ? true
                        : false
                    }
                    name="groupCount"
                    label="Ryhmien määrä"
                    defaultValue={formik.initialValues?.groupCount}
                    variant="outlined"
                    value={formik.values?.groupCount}
                    onChange={formik.handleChange("groupCount")}
                    onBlur={formik.handleBlur("groupCount")}
                    helperText={
                      formik.touched.groupCount && formik.errors.groupCount
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.sessionLength &&
                      formik.errors.sessionLength
                        ? true
                        : false
                    }
                    name="sessionLength"
                    label="Opetuskerran pituus(hh:mm)"
                    defaultValue={formik.initialValues?.sessionLength}
                    variant="outlined"
                    value={formik.values?.sessionLength}
                    onChange={formik.handleChange("sessionLength")}
                    onBlur={formik.handleBlur("sessionLength")}
                    helperText={
                      formik.touched.sessionLength &&
                      formik.errors.sessionLength
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.sessionCount && formik.errors.sessionCount
                        ? true
                        : false
                    }
                    name="sessionCount"
                    label="Opetuksien määrä viikossa"
                    defaultValue={formik.initialValues?.sessionCount}
                    variant="outlined"
                    value={formik.values?.sessionCount}
                    onChange={formik.handleChange("sessionCount")}
                    onBlur={formik.handleBlur("sessionCount")}
                    helperText={
                      formik.touched.sessionCount && formik.errors.sessionCount
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.area && formik.errors.area ? true : false
                    }
                    name="area"
                    label="Vaaditut neliömetrit"
                    defaultValue={formik.initialValues?.area}
                    variant="outlined"
                    value={formik.values?.area}
                    onChange={formik.handleChange("area")}
                    onBlur={formik.handleBlur("area")}
                    helperText={formik.touched.area && formik.errors.area}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: 225 }}>
                    <Select
                      error={
                        formik.touched.programId && formik.errors.programId
                          ? true
                          : false
                      }
                      name="programId"
                      defaultValue={formik.initialValues?.programId}
                      onChange={formik.handleChange("programId")}
                      value={formik.values?.programId}
                      onBlur={formik.handleBlur("programId")}
                    >
                      {programSelectList.map((value) => {
                        return (
                          <MenuItem key={value.id} value={value.id}>
                            {value.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {formik.touched.programId && formik.errors.programId}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: 225 }}>
                    <Select
                      name="spaceTypeId"
                      defaultValue={formik.initialValues?.spaceTypeId}
                      onChange={formik.handleChange("spaceTypeId")}
                      value={formik.values?.spaceTypeId}
                      onBlur={formik.handleBlur("spaceTypeId")}
                    >
                      {spaceTypeSelectList.map((value) => {
                        return (
                          <MenuItem key={value.id} value={value.id}>
                            {value.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
                onClick={() => {
                  setOpen(false);
                  // Nollataan lomake jos painaa peruuta
                  formik.resetForm();
                }}
                variant="contained"
                color="red"
              >
                Peruuta
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{ color: "white" }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Jatka
              </Button>
            </ThemeProvider>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
