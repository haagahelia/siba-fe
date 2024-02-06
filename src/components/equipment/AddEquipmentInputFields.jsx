import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export default function AddEquipmentInputFields({ formik }) {
  return (
    <>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <TextField
          fullWidth
          error={formik.touched.name && formik.errors.name ? true : false}
          name="name"
          placeholder="Name..."
          label="Equipment name"
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
        <FormControl fullWidth>
          <InputLabel>Is movable</InputLabel>
          <Select
            fullWidth
            name="isMovable"
            error={
              formik.touched.isMovable && formik.errors.isMovable ? true : false
            }
            label="Is Movable"
            variant="outlined"
            value={formik.values.isMovable.toString()}
            onChange={formik.handleChange("isMovable")}
            onBlur={formik.handleBlur("isMovable")}
          >
            <MenuItem value="1">Yes</MenuItem>
            <MenuItem value="0">No</MenuItem>
          </Select>
          <FormHelperText error>
            {formik.touched.isMovable && formik.errors.isMovable
              ? formik.errors.isMovable
              : null}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <TextField
          fullWidth
          error={
            formik.touched.priority && formik.errors.priority ? true : false
          }
          type="number"
          name="priority"
          label="Priority"
          placeholder="0"
          variant="outlined"
          value={formik.values.priority}
          onChange={formik.handleChange("priority")}
          onBlur={formik.handleBlur("priority")}
          helperText={
            formik.touched.priority && formik.errors.priority
              ? formik.errors.priority
              : null
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
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
