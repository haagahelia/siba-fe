// The Add Lesson Form
import { useState } from "react";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function AddProgramForm({
  handleChange,
  formik,
  submitValues,
  setInitialProgram,
  allProgramsList,
  departmentSelectList,
}) {
  const [selectedProgram, setSelectedProgram] = useState("");

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              error={formik.touched.name && Boolean(formik.errors.name)}
              name="name"
              label="Name"
              placeholder="Name..."
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.name && formik.errors.name}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                name="departmentId"
                label="Department"
                onChange={formik.handleChange}
                value={formik.values.departmentId || ""}
                onBlur={formik.handleBlur}
              >
                {departmentSelectList.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={3} padding={2}>
          <Button
            type="submit"
            variant="addComponentFormButton"
            onClick={() => {
              setInitialProgram(submitValues);
            }}
          >
            Add Program
          </Button>
        </Grid>
      </form>
    </div>
  );
}
