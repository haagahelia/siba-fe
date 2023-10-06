import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function BuildingInputField({ formik }) {
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          error={formik.touched.name && formik.errors.name ? true : false}
          name="name"
          label="Building name"
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
    </>
  );
}