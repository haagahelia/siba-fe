import React from "react"; // { useState, useEffect } ???
import TextField from "@mui/material/TextField";
import { Button, Grid, FormHelperText, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export default function AddSubjectForm(props) {
  const {
    handleChange,
    programSelectList,
    formik,
    submitValues,
    setInitialSubject,
    allSubjectsList,
    spaceTypeSelectList,
  } = props;

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container variant="sibaGridAddForm" column={8}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={formik.touched.name && formik.errors.name ? true : false}
              name="name"
              label="Name of the lesson"
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
              label="Group size"
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
              label="Group count"
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
              label="Length of lesson(hh:mm)"
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
              label="Number of lessons per week"
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
              label="Required square meters"
              variant="outlined"
              value={formik.values.area}
              onChange={formik.handleChange("area")}
              onBlur={formik.handleBlur("area")}
              helperText={formik.touched.area && formik.errors.area}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ maxWidth: 220, maxHeight: 58, minWidth: 120 }}>
              <InputLabel>Major</InputLabel>

              <Select
                name="programId"
                onChange={formik.handleChange("programId")}
                value={formik.values.programId}
                defaultValue=""
                error={
                  formik.touched.programId && formik.errors.programId
                    ? true
                    : false
                }
                onBlur={formik.handleBlur("programId")}
              >
                {programSelectList.map((program) => {
                  return (
                    <MenuItem key={program.id} value={program.id}>
                      {program.name}
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
              <InputLabel>Room type</InputLabel>

              <Select
                name="spaceTypeId"
                onChange={formik.handleChange("spaceTypeId")}
                value={formik.values.spaceTypeId}
                defaultValue=""
                onBlur={formik.handleBlur("spaceTypeId")}
              >
                {spaceTypeSelectList.map((spaceType) => {
                  return (
                    <MenuItem key={spaceType.id} value={spaceType.id}>
                      {spaceType.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: "#F6E9E9" }}>
              Copy the information from another lesson
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ maxWidth: 340, minWidth: 270 }}>
              <InputLabel>Copy data from an existing lesson</InputLabel>
              <Select onChange={handleChange}>
                {allSubjectsList.map((value) => {
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
          <Button
            type="submit"
            variant="contained"
            style={{ color: "white" }}
            onClick={() => {
              setInitialSubject(submitValues);
            }}
          >
            Add
          </Button>
        </Grid>
      </form>
    </div>
  );
}
