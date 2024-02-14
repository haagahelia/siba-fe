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
            error={formik.touched.name && formik.errors.name ? true : false}
            name="name"
            label="Setting name"
            variant="outlined"
            required
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            helperText={
              formik.touched.name && formik.errors.name ? (
                formik.errors.name
              ) : (
                <span style={{ color: "red" }}>This field is required</span>
              )
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
            required
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            helperText={
              formik.touched.description && formik.errors.description ? (
                formik.errors.description
              ) : (
                <span style={{ color: "red" }}>This field is required</span>
              )
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
