// The Add Lesson Form
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";

export default function AddSubjectForm({
  handleChange,
  programSelectList,
  formik,
  submitValues,
  setInitialSubject,
  spaceTypeSelectList,
}) {
  const [selectedLesson, setSelectedLesson] = useState("");
  const [allocRounds, setAllocRounds] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => getAllAllocRounds, []);

  const getAllAllocRounds = async () => {
    const { data } = await dao.fetchAllAllocRounds();
    setAllocRounds(data);
  };

  const getSubjects = async (allocRoundId) => {
    Logger.debug("selectedAllocRound", allocRoundId);
    const { data } = await dao.fetchAllSubjects(allocRoundId);
    setSubjects(data);
    setSelectedLesson("");
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            lg={6}
            style={{ border: "5px solid #FDA826", padding: "10px" }}
          >
            <FormControl fullWidth>
              <InputLabel>Select Allocation Round</InputLabel>
              <Select
                name="selectAllocRound"
                label="Select Existing AllocRound"
                onChange={(e) => {
                  getSubjects(e.target.value.id);
                }}
                onBlur={formik.handleBlur}
              >
                {allocRounds.map((value) => (
                  <MenuItem key={value.id} value={value}>
                    {`${value.id} - ${value.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Select subject as template</InputLabel>
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
                {subjects.map((value) => (
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
              label="Name of the lesson"
              placeholder="Name..."
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              helperText={
                formik.touched.groupSize && formik.errors.groupSize
                  ? formik.errors.groupSize
                  : null
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
                formik.touched.groupCount && Boolean(formik.errors.groupCount)
              }
              name="groupCount"
              label="Group count"
              value={formik.values.groupCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.groupCount && formik.errors.groupCount
                  ? formik.errors.groupCount
                  : null
              }
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
              type="time"
              value={formik.values.sessionLength}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="hh:mm"
              helperText={
                formik.touched.sessionLength && formik.errors.sessionLength
                  ? formik.errors.sessionLength
                  : null
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
              label="Number of sessions per week"
              value={formik.values.sessionCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.sessionCount && formik.errors.sessionCount
                  ? formik.errors.sessionCount
                  : null
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
              helperText={
                formik.touched.area && formik.errors.area
                  ? formik.errors.area
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Program</InputLabel>
              <Select
                label="Program"
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
              <InputLabel>Space type</InputLabel>
              <Select
                name="spaceTypeId"
                label="Space Type"
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
