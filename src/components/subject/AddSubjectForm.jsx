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

export default function AddSubjectForm({
  handleChange,
  programSelectList,
  formik,
  submitValues,
  setInitialSubject,
  allSubjectsList,
  spaceTypeSelectList,
}) {
  const [selectedLesson, setSelectedLesson] = useState("");

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={3}
            style={{ border: "5px solid #FDA826", padding: "10px" }}
          >
            <FormControl fullWidth>
              <InputLabel>Copy Existing Lesson?</InputLabel>
              <Select
                name="copyLesson"
                label="Copy Existing Lesson"
                onChange={(e) => {
                  handleChange(e);
                  setSelectedLesson(e.target.value);
                }}
                value={selectedLesson}
                onBlur={formik.handleBlur}
              >
                {allSubjectsList.map((value) => (
                  <MenuItem key={value.id} value={value}>
                    {value.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              error={
                formik.touched.groupSize && Boolean(formik.errors.groupSize)
              }
              name="groupSize"
              label="Group size"
              value={formik.values.groupSize}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.groupSize && formik.errors.groupSize}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              error={
                formik.touched.groupCount && Boolean(formik.errors.groupCount)
              }
              name="groupCount"
              label="Group count"
              value={formik.values.groupCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.groupCount && formik.errors.groupCount}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              error={
                formik.touched.sessionLength &&
                Boolean(formik.errors.sessionLength)
              }
              name="sessionLength"
              label="Lesson Length"
              value={formik.values.sessionLength}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="hh:mm:ss"
              helperText={
                formik.touched.sessionLength && formik.errors.sessionLength
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              error={
                formik.touched.sessionCount &&
                Boolean(formik.errors.sessionCount)
              }
              name="sessionCount"
              label="Number of lessons per week"
              value={formik.values.sessionCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.sessionCount && formik.errors.sessionCount
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              error={formik.touched.area && Boolean(formik.errors.area)}
              name="area"
              label="Required square meters"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.area && formik.errors.area}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Major</InputLabel>
              <Select
                label="Major"
                name="programId"
                onChange={formik.handleChange}
                value={formik.values.programId || ""}
                error={
                  formik.touched.programId && Boolean(formik.errors.programId)
                }
                onBlur={formik.handleBlur}
              >
                {programSelectList.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.programId && formik.errors.programId}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Room type</InputLabel>
              <Select
                name="spaceTypeId"
                label="Room Type"
                onChange={formik.handleChange}
                value={formik.values.spaceTypeId || ""}
                onBlur={formik.handleBlur}
              >
                {spaceTypeSelectList.map((spaceType) => (
                  <MenuItem key={spaceType.id} value={spaceType.id}>
                    {spaceType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid padding={2}>
          <Button
            type="submit"
            variant="addComponentFormButton"
            onClick={() => {
              setInitialSubject(submitValues);
            }}
          >
            Add Lesson
          </Button>
        </Grid>
      </form>
    </div>
  );
}
