import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function AllocRoundInputFields({ formik }) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          error={formik.touched.name && formik.errors.name ? true : false}
          name="name"
          label="The name of the allocation round"
          defaultValue={formik.initialValues?.name}
          variant="outlined"
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={
            formik.touched.description && formik.errors.description
              ? true
              : false
          }
          name="description"
          label="Description "
          defaultValue={formik.initialValues?.description}
          variant="outlined"
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
