import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AddSettingForm({
  formik,
  submitValues,
  setInitialSetting,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container variant="sibaGridAddForm" column={8}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            error={
              formik.touched.variable && formik.errors.variable ? true : false
            }
            name="variable"
            label="Setting variable"
            variant="outlined"
            value={formik.values.variable}
            onChange={formik.handleChange("variable")}
            onBlur={formik.handleBlur("variable")}
            helperText={
              formik.touched.variable && formik.errors.variable
                ? formik.errors.variable
                : ""
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
                : ""
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
            label="Number Value (optional)"
            variant="outlined"
            value={formik.values.numberValue}
            onChange={formik.handleChange("numberValue")}
            onBlur={formik.handleBlur("numberValue")}
            helperText={
              formik.touched.numberValue && formik.errors.numberValue
                ? formik.errors.numberValue
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            error={
              formik.touched.textValue && formik.errors.textValue ? true : false
            }
            name="textValue"
            label="Text Value (optional)"
            variant="outlined"
            value={formik.values.textValue}
            onChange={formik.handleChange("textValue")}
            onBlur={formik.handleBlur("textValue")}
            helperText={
              formik.touched.textValue && formik.errors.textValue
                ? formik.errors.textValue
                : ""
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={3} padding={2}>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            setInitialSetting(submitValues);
          }}
        >
          Add
        </Button>
      </Grid>
    </form>
  );
}
