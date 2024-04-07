import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function SpaceTypeInputFields({ formik }) {
  return (
    <>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <TextField
          fullWidth
          error={formik.touched.name && formik.errors.name ? true : false}
          name="name"
          placeholder="Name..."
          label="Space type name"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          helperText={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <TextField
          fullWidth
          error={formik.touched.acronym && formik.errors.acronym ? true : false}
          name="acronym"
          placeholder="Acronym..."
          label="Space type acronym"
          variant="outlined"
          value={formik.values.acronym}
          onChange={formik.handleChange("acronym")}
          onBlur={formik.handleBlur("acronym")}
          helperText={
            formik.touched.acronym && formik.errors.acronym
              ? formik.errors.acronym
              : null
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <TextField
          fullWidth
          error={
            formik.touched.description && formik.errors.description
              ? true
              : false
          }
          name="description"
          label="Description"
          placeholder="Some description..."
          variant="outlined"
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          helperText={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : null
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </>
  );
}
