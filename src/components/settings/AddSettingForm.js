import React from "react"; // { useState, useEffect } ???
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

export default function AddSettingForm(props) {
  const { formik, submitValues, setInitialSetting } = props;

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Grid container variant="sibaGridAddForm" column={8}>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              error={formik.touched.name && formik.errors.name ? true : false}
              name="name"
              label="Setting name"
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
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              error={
                formik.touched.description && formik.errors.description
                  ? true
                  : false
              }
              name="description"
              label="Description"
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              helperText={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              error={
                formik.touched.numberValue && formik.errors.numberValue
                  ? true
                  : false
              }
              name="numberValue"
              label="numberValue"
              variant="outlined"
              value={formik.values.numberValue}
              onChange={formik.handleChange("numberValue")}
              onBlur={formik.handleBlur("numberValue")}
              helperText={
                formik.touched.numberValue && formik.errors.numberValue
                  ? formik.errors.numberValue
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              error={
                formik.touched.textValue && formik.errors.textValue
                  ? true
                  : false
              }
              name="textValue"
              label="textValue"
              variant="outlined"
              value={formik.values.textValue}
              onChange={formik.handleChange("textValue")}
              onBlur={formik.handleBlur("textValue")}
              helperText={
                formik.touched.textValue && formik.errors.textValue
                  ? formik.errors.textValue
                  : null
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={3} padding={2}>
          <Button
            type="submit"
            variant="contained"
            style={{ color: "white" }}
            onClick={() => {
              setInitialSetting(submitValues);
            }}
          >
            Add
          </Button>
        </Grid>
      </form>
    </React.Fragment>
  );
}
