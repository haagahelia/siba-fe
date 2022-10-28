import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Grid,
  FormHelperText,
  CardHeader,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AlertBox from "../common/AlertBox";
import { Formik, useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import {
  validate,
  capitalizeFirstLetter,
} from "../../validation/ValidateAddSubject";
import dao from "../../ajax/dao";
//import { styled } from "@mui/material/styles";
//import Paper from "@mui/material/Paper";

//const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

export default function AddSubject(props) {
  const { refreshSubjects, subjectList } = props;
  const [programNameList, setProgramNameList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  // Tässä fromikin initialvalues tallennetaan stateen
  const [copySubjectData, setCopySubjectData] = useState({
    name: "",
    groupSize: 0,
    groupCount: 0,
    sessionLength: "",
    sessionCount: 0,
    area: 0,
    programId: 0,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: copySubjectData,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: "Haluatko varmasti lisätä " + values.name + "?",
        content:
          "Painamalla jatka, " + values.name + " lisätään opetuslistaukseen",
      });
      setDialogOpen(true);
      return;
    },
  });

  const programs = async function () {
    const data = await dao.getProgramNames();
    if (data === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen palvelimella. Pääaineita ei löytynyt.",
      });
      setAlertOpen(true);
      return;
    } else {
      setProgramNameList(data);
    }
  };
  useEffect(() => {
    programs();
  }, []);

  const addSubject = async (values) => {
    let capitalName = capitalizeFirstLetter(values.name);
    let newSubject = {
      name: capitalName,
      groupSize: values.groupSize,
      groupCount: values.groupCount,
      sessionLength: values.sessionLength,
      sessionCount: values.sessionCount,
      area: values.area,
      programId: values.programId,
    };
    let result = await dao.postNewSubject(newSubject);
    if (result === 400) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }
    if (result === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message:
          "Jokin meni pieleen palvelimella - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }
    if (result === "error") {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message:
          "Jokin meni pieleen palvelimella - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }
    setAlertOptions({
      severity: "success",
      title: "Onnistui!",
      message: values.name + " lisätty.",
    });
    setAlertOpen(true);

    refreshSubjects();
  };
  // Tässä tulee lista opetuksia
  // Kun opetuksen valitsee menee tiedot formikin initialvaluesiin
  const handleChange = (e) => {
    // console.log(e.target.value);
    let selected = e.target.value;
    setCopySubjectData({
      name: formik.values.name, // Tämä, jotta syötetty nimi ei vaihdu vaikka valitsisi olemassa olevan opetuksen tiedot
      groupSize: selected.groupSize,
      groupCount: selected.groupCount,
      sessionLength: selected.sessionLength,
      sessionCount: selected.sessionCount,
      area: selected.area,
      programId: selected.programId,
    });
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      ></AlertBox>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        confirmfunction={addSubject}
        functionparam={formik.values}
      ></ConfirmationDialog>
      {/* <Container
        sx={{
          width: "85%",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{ backgroundColor: "#272121", borderColor: "#E16428", boder: 1 }}
        > */}
      <Card
        variant="outlined"
        sx={{
          width: "70%",
          padding: 1,
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <CardContent>
          <CardHeader
            title="Lisää opetus"
            sx={{ marginBottom: "30px" }}
          ></CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <div id="input-container">
              <Grid
                container
                rowSpacing={4}
                columnSpacing={5}
                column={6}
                justifyContent="space-evenly"
                alignItems="center"
                padding={1}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    error={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    name="name"
                    label="Opetuksen nimi"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : null
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    error={
                      formik.touched.groupSize && formik.errors.groupSize
                        ? true
                        : false
                    }
                    name="groupSize"
                    label="Ryhmän koko"
                    variant="outlined"
                    value={formik.values.groupSize}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.groupSize && formik.errors.groupSize
                        ? formik.errors.groupSize
                        : null
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    error={
                      formik.touched.groupCount && formik.errors.groupCount
                        ? true
                        : false
                    }
                    name="groupCount"
                    label="Ryhmien määrä"
                    variant="outlined"
                    value={formik.values.groupCount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.groupCount && formik.errors.groupCount
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    error={
                      formik.touched.sessionLength &&
                      formik.errors.sessionLength
                        ? true
                        : false
                    }
                    name="sessionLength"
                    label="Opetuskerran pituus(hh:mm:ss)"
                    variant="outlined"
                    value={formik.values.sessionLength}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.sessionLength &&
                      formik.errors.sessionLength
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    error={
                      formik.touched.sessionCount && formik.errors.sessionCount
                        ? true
                        : false
                    }
                    name="sessionCount"
                    label="Opetuksien määrä viikossa"
                    variant="outlined"
                    value={formik.values.sessionCount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.sessionCount && formik.errors.sessionCount
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    error={
                      formik.touched.area && formik.errors.area ? true : false
                    }
                    name="area"
                    label="Vaaditut neliömetrit"
                    variant="outlined"
                    value={formik.values.area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.area && formik.errors.area}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl sx={{ m: 4, minWidth: 120 }}>
                  <InputLabel>Pääaine</InputLabel>

                  <Select
                    name="programId"
                    onChange={formik.handleChange}
                    value={formik.values.programId}
                    error={
                      formik.touched.programId && formik.errors.programId
                        ? true
                        : false
                    }
                    onBlur={formik.handleBlur}
                  >
                    {programNameList.map((value) => {
                      return (
                        <MenuItem key={value.id} value={value.id}>
                          {value.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    {formik.touched.programId && formik.errors.programId}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Typography variant="h6" sx={{ color: "#F6E9E9" }}>
                Kopioi tiedot toisesta opetuksesta
              </Typography>
              <Grid item xs={4}>
                <FormControl sx={{ minWidth: 340 }}>
                  <InputLabel>
                    Kopioi olemassa olevan opetuksen tiedot
                  </InputLabel>
                  <Select onChange={handleChange}>
                    {subjectList.map((value) => {
                      return (
                        <MenuItem key={value.id} value={value}>
                          {value.subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} padding={2}>
                <Button variant="contained" color="success" type="submit">Lisää</Button>
              </Grid>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* </Box>
      </Container> */}
    </div>
  );
}
