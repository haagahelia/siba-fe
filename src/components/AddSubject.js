import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import { Box, Container } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import AlertBox from "../components/AlertBox";
import { Formik, useFormik } from "formik";

export default function AddSubject() {
  const [programNameList, setProgramNameList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      groupSize: 0,
      groupCount: 0,
      sessionLength: "",
      sessionCount: 0,
      area: 0,
      programId: 0,
    },
    validate,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      addSubject(values);
    },
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/api/program/getNames")
      .then((response) => {
        setProgramNameList(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setAlertOptions({
            severity: "error",
            message:
              "Oho! Jotain meni pieleen palvelimella. Pääaineita ei löytynyt",
          });
          setAlertOpen(true);
          return;
        }
      });
  }, []);

  const addSubject = (values) => {
    let capitalName = capitalizeFirstLetter(values.name); // ????

    axios
      .post("http://localhost:3001/api/subject/post", {
        name: capitalName,
        groupSize: values.groupSize,
        groupCount: values.groupCount,
        sessionLength: values.sessionLength,
        sessionCount: values.sessionCount,
        area: values.area,
        programId: values.programId,
      })

      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);

        if (error.response.status === 400) {
          setAlertOptions({
            severity: "error",
            message: "Oho! Jotain meni pieleen lisäyksessä",
          });
          setAlertOpen(true);
          return;
        }
        if (error.response.status === 500) {
          setAlertOptions({
            severity: "error",
            message:
              "Oho! Jotain meni pieleen palvelimella. Ainetta ei lisätty",
          });
          setAlertOpen(true);
          return;
        }
      });

    setAlertOptions({
      severity: "success",
      message: "Aine lisätty",
    });
    setAlertOpen(true);
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      ></AlertBox>
      <Container style={{ width: "50%", marginTop: "50px" }}>
        <Box style={{ backgroundColor: "rgba(52, 139, 147, 0.5 )" }}>
          <form onSubmit={formik.handleSubmit}>
            <div id="input-container">
              <Grid
                container
                rowSpacing={2}
                columnSpacing={1}
                column={6}
                justifyContent="space-evenly"
                alignItems="center"
                padding={1}
              >
                <Grid item xs={4}>
                  <TextField
                    error={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    name="name"
                    label="Aineen nimi"
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
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                  <TextField
                    error={
                      formik.touched.sessionLength &&
                      formik.errors.sessionLength
                        ? true
                        : false
                    }
                    name="sessionLength"
                    label="Opetuksen pituus"
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
                <Grid item xs={4}>
                  <TextField
                    error={
                      formik.touched.sessionCount && formik.errors.sessionCount
                        ? true
                        : false
                    }
                    name="sessionCount"
                    label="Opetuksien määrä"
                    variant="outlined"
                    value={formik.values.sessionCount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.sessionCount && formik.errors.sessionCount
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={4}>
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
              <Grid item xs={4}>
                <FormControl sx={{ m: 4, minWidth: 120 }}>
                  <InputLabel>Pääaine</InputLabel>

                  <Select
                    name="programId"
                    onChange={formik.handleChange}
                    value={formik.values.programId}
                  >
                    {programNameList.map((value) => {
                      return (
                        <MenuItem key={value.id} value={value.id}>
                          {value.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <Grid item xs={3}>
              <Button type="submit">Lisää</Button>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function validate(values) {
  const errors = {};
  const regName = new RegExp("^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$");
  const regNumber = new RegExp("[0-9]+");
  const regTime = new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$");
  const regArea = new RegExp("[0-9]{0,2}(.[0-9]{1,2})?");
  if (!values.name) {
    errors.name = "Pakollinen kenttä";
  } else if (values.name.length < 1 || values.name.length > 255) {
    errors.name = "Nimen pitää olla 1-255 merkkiä pitkä";
  } else if (!regName.test(values.name)) {
    errors.name = "Vain kirjaimet sallittu";
  }
  if (!values.groupSize) {
    errors.groupSize = "Pakollinen kenttä";
  } else if (values.groupSize <= 0) {
    errors.groupSize = "Ryhmän koko ei voi olla 0";
  } else if (!regNumber.test(values.groupSize)) {
    errors.groupSize = "Vain numerot sallittu";
  }

  if (!values.groupCount) {
    errors.groupCount = "Pakollinen kenttä";
  } else if (values.groupCount <= 0) {
    errors.groupCount = "Ryhmien määrä ei voi olla 0";
  } else if (!regNumber.test(values.groupCount)) {
    errors.groupCount = "Vain numerot sallittu";
  }

  if (!values.sessionLength) {
    errors.sessionLength = "Pakollinen kenttä";
  } else if (!regTime.test(values.sessionLength)) {
    errors.sessionLength = "Sallittu muoto on 00:00";
  }

  if (!values.sessionCount) {
    errors.sessionCount = "Pakollinen kenttä";
  } else if (values.sessionCount <= 0) {
    errors.sessionCount = "Opetuksien määrä ei voi olla 0";
  } else if (!regNumber.test(values.sessionCount)) {
    errors.sessionCount = "Vain numerot sallittu";
  }

  if (!values.area) {
    errors.area = "Pakollinen kenttä";
  } else if (values.area <= 0) {
    errors.area = "Vaadittu määrä ei voi olla 0";
  } else if (!regArea.test(values.area)) {
    errors.area = "Vain numerot sallittu";
  }

  if (!values.programId) {
    errors.programId = "Pakollinen kenttä";
  }
  return errors;
}
