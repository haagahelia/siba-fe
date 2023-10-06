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
        <Grid container variant="sibaGridAddForm" column={8}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={formik.touched.name && Boolean(formik.errors.name)}
              name="name"
              label="Name of the lesson"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={
                formik.touched.groupSize && Boolean(formik.errors.groupSize)
              }
              name="groupSize"
              label="Group size"
              variant="outlined"
              value={formik.values.groupSize}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.groupSize && formik.errors.groupSize}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={
                formik.touched.groupCount && Boolean(formik.errors.groupCount)
              }
              name="groupCount"
              label="Group count"
              variant="outlined"
              value={formik.values.groupCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.groupCount && formik.errors.groupCount}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={
                formik.touched.sessionLength &&
                Boolean(formik.errors.sessionLength)
              }
              name="sessionLength"
              label="Length of lesson(hh:mm)"
              variant="outlined"
              value={formik.values.sessionLength}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.sessionLength && formik.errors.sessionLength
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={
                formik.touched.sessionCount &&
                Boolean(formik.errors.sessionCount)
              }
              name="sessionCount"
              label="Number of lessons per week"
              variant="outlined"
              value={formik.values.sessionCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.sessionCount && formik.errors.sessionCount
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={formik.touched.area && Boolean(formik.errors.area)}
              name="area"
              label="Required square meters"
              variant="outlined"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.area && formik.errors.area}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ maxWidth: 220, maxHeight: 58, minWidth: 120 }}>
              <InputLabel>Major</InputLabel>
              <Select
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
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ maxWidth: 220, maxHeight: 58, minWidth: 120 }}>
              <InputLabel>Room type</InputLabel>
              <Select
                name="spaceTypeId"
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
          <Grid item xs={12}>
            <Typography variant="sibaTypography">
              Copy the information from another lesson
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ maxWidth: 340, minWidth: 270 }}>
              <InputLabel>Copy data from an existing lesson</InputLabel>
              <Select
                value={selectedLesson}
                onChange={(e) => {
                  handleChange(e);
                  setSelectedLesson(e.target.value);
                }}
              >
                {allSubjectsList.map((value) => (
                  <MenuItem key={value.id} value={value}>
                    {value.subjectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={3} padding={2}>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              setInitialSubject(submitValues);
            }}
          >
            Add
          </Button>
        </Grid>
      </form>
    </div>
  );
}