import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Grid,
  FormHelperText,
  Typography,
  createMuiTheme,
  ThemeProvider,
} from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { globalTheme } from "../styles/theme";

export default function AddSubjectForm(props) {
  const {
    handleChange,
    programNameList,
    formik,
    values,
    setCopySubjectData,
    subjectList,
    copySubjectData,
    spaceTypeNameList,
  } = props;

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={1}
          column={8}
          justifyContent="space-evenly"
          alignItems="center"
          padding={1}
        >
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={formik.touched.name && formik.errors.name ? true : false}
              name="name"
              label="Opetuksen nimi"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={
                formik.touched.groupSize && formik.errors.groupSize
                  ? true
                  : false
              }
              name="groupSize"
              label="Ryhmän koko"
              variant="outlined"
              value={formik.values.groupSize}
              onChange={formik.handleChange("groupSize")}
              onBlur={formik.handleBlur("groupSize")}
              helperText={
                formik.touched.groupSize && formik.errors.groupSize
                  ? formik.errors.groupSize
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={
                formik.touched.groupCount && formik.errors.groupCount
                  ? true
                  : false
              }
              name="groupCount"
              label="Ryhmien määrä"
              variant="outlined"
              value={formik.values.groupCount}
              onChange={formik.handleChange("groupCount")}
              onBlur={formik.handleBlur("groupCount")}
              helperText={formik.touched.groupCount && formik.errors.groupCount}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={
                formik.touched.sessionLength && formik.errors.sessionLength
                  ? true
                  : false
              }
              name="sessionLength"
              label="Opetuskerran pituus(hh:mm:ss)"
              variant="outlined"
              value={formik.values.sessionLength}
              onChange={formik.handleChange("sessionLength")}
              onBlur={formik.handleBlur("sessionLength")}
              helperText={
                formik.touched.sessionLength && formik.errors.sessionLength
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={
                formik.touched.sessionCount && formik.errors.sessionCount
                  ? true
                  : false
              }
              name="sessionCount"
              label="Opetuksien määrä viikossa"
              variant="outlined"
              value={formik.values.sessionCount}
              onChange={formik.handleChange("sessionCount")}
              onBlur={formik.handleBlur("sessionCount")}
              helperText={
                formik.touched.sessionCount && formik.errors.sessionCount
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={formik.touched.area && formik.errors.area ? true : false}
              name="area"
              label="Vaaditut neliömetrit"
              variant="outlined"
              value={formik.values.area}
              onChange={formik.handleChange("area")}
              onBlur={formik.handleBlur("area")}
              helperText={formik.touched.area && formik.errors.area}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ maxWidth: 220, maxHeight: 58, minWidth: 120 }}>
              <InputLabel>Pääaine</InputLabel>

              <Select
                name="programId"
                onChange={formik.handleChange("programId")}
                value={formik.values.programId}
                error={
                  formik.touched.programId && formik.errors.programId
                    ? true
                    : false
                }
                onBlur={formik.handleBlur("programId")}
              >
                {programNameList.map((value) => {
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
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ maxWidth: 220, maxHeight: 58, minWidth: 120 }}>
              <InputLabel>Huoneen tyyppi</InputLabel>

              <Select
                name="spaceTypeId"
                onChange={formik.handleChange("spaceTypeId")}
                value={formik.values.spaceTypeId}
                onBlur={formik.handleBlur("spaceTypeId")}
              >
                {spaceTypeNameList.map((value) => {
                  return (
                    <MenuItem key={value.id} value={value.id}>
                      {value.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: "#F6E9E9" }}>
              Kopioi tiedot toisesta opetuksesta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ maxWidth: 340, minWidth: 200 }}>
              <InputLabel>Kopioi olemassa olevan opetuksen tiedot</InputLabel>
              <Select onChange={handleChange}>
                {subjectList.map((value) => {
                  return (
                    <MenuItem key={value.id} value={value}>
                      {value.subjectName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={3} padding={2}>
          <ThemeProvider theme={globalTheme}>
            <Button
              type="submit"
              variant="contained"
              style={{ color: "white" }}
              onClick={() => {
                setCopySubjectData(values);
              }}
            >
              Lisää
            </Button>
          </ThemeProvider>
        </Grid>
      </form>
    </div>
  );
}
