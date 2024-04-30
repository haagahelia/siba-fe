import { useState } from "react";

import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

export default function EditSpaceForm({
  buildingSelectList,
  formik,
  spaceTypeSelectList,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        className="editButton"
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open} maxWidth="md" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle sx={{ maxWidth: "300px" }}>
            Edit: {formik.initialValues?.name}
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              variant="sibaGridEditSpace" //placeholder variant, see theme.js
              spacing={3}
              column={7}
            >
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  name="name"
                  label="Space Name"
                  variant="outlined"
                  value={formik.values?.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  error={
                    formik.touched.area && formik.errors.area ? true : false
                  }
                  name="area"
                  label="Area (in square meters)"
                  variant="outlined"
                  value={formik.values?.area}
                  onChange={formik.handleChange("area")}
                  onBlur={formik.handleBlur("area")}
                  helperText={formik.touched.area && formik.errors.area}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  error={
                    formik.touched.info && formik.errors.info ? true : false
                  }
                  name="info"
                  label="Additional Information"
                  variant="outlined"
                  value={formik.values?.info}
                  onChange={formik.handleChange("info")}
                  onBlur={formik.handleBlur("info")}
                  helperText={formik.touched.info && formik.errors.info}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  error={
                    formik.touched.personLimit && formik.errors.personLimit
                      ? true
                      : false
                  }
                  name="personLimit"
                  label="Maximum Persons Allowed"
                  variant="outlined"
                  value={formik.values?.personLimit}
                  onChange={formik.handleChange("personLimit")}
                  onBlur={formik.handleBlur("personLimit")}
                  helperText={
                    formik.touched.personLimit && formik.errors.personLimit
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  error={
                    formik.touched.availableFrom && formik.errors.availableFrom
                      ? true
                      : false
                  }
                  name="availableFrom"
                  label="Available From (hh:mm)"
                  variant="outlined"
                  value={formik.values?.availableFrom}
                  onChange={formik.handleChange("availableFrom")}
                  onBlur={formik.handleBlur("availableFrom")}
                  helperText={
                    formik.touched.availableFrom && formik.errors.availableFrom
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  error={
                    formik.touched.availableTo && formik.errors.availableTo
                      ? true
                      : false
                  }
                  name="availableTo"
                  label="Available To (hh:mm)"
                  variant="outlined"
                  value={formik.values?.availableTo}
                  onChange={formik.handleChange("availableTo")}
                  onBlur={formik.handleBlur("availableTo")}
                  helperText={
                    formik.touched.availableTo && formik.errors.availableTo
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  error={
                    formik.touched.classesFrom && formik.errors.classesFrom
                      ? true
                      : false
                  }
                  name="classesFrom"
                  label="Classes From (hh:mm)"
                  variant="outlined"
                  value={formik.values?.classesFrom}
                  onChange={formik.handleChange("classesFrom")}
                  onBlur={formik.handleBlur("classesFrom")}
                  helperText={
                    formik.touched.classesFrom && formik.errors.classesFrom
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  error={
                    formik.touched.classesTo && formik.errors.classesTo
                      ? true
                      : false
                  }
                  name="classesTo"
                  label="Classes To (hh:mm)"
                  variant="outlined"
                  value={formik.values?.classesTo}
                  onChange={formik.handleChange("classesTo")}
                  onBlur={formik.handleBlur("classesTo")}
                  helperText={
                    formik.touched.classesTo && formik.errors.classesTo
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="building-label">Building</InputLabel>
                  <Select
                    labelId="building-label"
                    name="buildingId"
                    value={formik.values.buildingId}
                    onChange={formik.handleChange("buildingId")}
                  >
                    {buildingSelectList.map((building) => (
                      <MenuItem key={building.id} value={building.id}>
                        {building.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="spaceType-label">Space type</InputLabel>
                  <Select
                    labelId="spaceType-label"
                    name="spaceTypeId"
                    onChange={formik.handleChange("spaceTypeId")}
                    value={formik.values?.spaceTypeId}
                    onBlur={formik.handleBlur("spaceTypeId")}
                  >
                    {spaceTypeSelectList.map((value) => {
                      return (
                        <MenuItem key={value.id} value={value.id}>
                          {value.name} ({value.acronym})
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="inUse-label">In Use</InputLabel>
                  <Select
                    labelId="inUse-label"
                    error={
                      formik.touched.inUse && formik.errors.inUse ? true : false
                    }
                    name="inUse"
                    onChange={formik.handleChange("inUse")}
                    value={formik.values?.inUse}
                    onBlur={formik.handleBlur("inUse")}
                  >
                    <MenuItem value="1">Yes</MenuItem>
                    <MenuItem value="0">No</MenuItem>
                  </Select>
                  <FormHelperText>
                    {formik.touched.inUse && formik.errors.inUse}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4} />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                formik.resetForm();
              }}
              variant="contained"
              className="redButton"
            >
              Cancel
            </Button>
            <Tooltip
              title={
                formik.dirty ? "" : "Please change values to enable submit"
              }
              placement="top"
            >
              <span>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!formik.dirty}
                  onClick={() => setOpen(false)}
                >
                  Submit
                </Button>
              </span>
            </Tooltip>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
