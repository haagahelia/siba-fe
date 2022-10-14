import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, FormHelperText } from "@mui/material";
import { Box, Container } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import FormControl from "@mui/material/FormControl";
import AlertBox from "../components/AlertBox";
import { Formik, useFormik } from "formik";
import ConfirmationDialog from "./ConfirmationDialog";
import {
  validate,
  capitalizeFirstLetter,
} from "../validation/ValidateAddSubject";

export default function AddSubject(props) {
  const { getAllSubjects } = props;
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
      setDialogOptions({
        title: "Haluatko varmasti lisätä " + values.name + "?",
        content:
          "Painamalla jatka, " + values.name + " lisätään opetuslistaukseen",
      });
      setDialogOpen(true);
      return;
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
            title: "Virhe",
            message: "Jokin meni pieleen palvelimella. Pääaineita ei löytynyt.",
          });
          setAlertOpen(true);
          return;
        }
      });
  }, []);

  const addSubject = (values) => {
    let capitalName = capitalizeFirstLetter(values.name);

    Axios.post("http://localhost:3001/api/subject/post", {
      name: capitalName,
      groupSize: values.groupSize,
      groupCount: values.groupCount,
      sessionLength: values.sessionLength,
      sessionCount: values.sessionCount,
      area: values.area,
      programId: values.programId,
    })
      .then((response) => {
        getAllSubjects();
        console.log(response);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setAlertOptions({
            severity: "error",
            title: "Virhe",
            message: "Jokin meni pieleen - yritä hetken kuluttua uudestaan.",
          });
          setAlertOpen(true);
          return;
        }
        if (error.response.status === 500) {
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
          severity: "error",
          title: "Virhe",
          message: "Jokin meni pieleen - yritä hetken kuluttua uudestaan.",
        });
        setAlertOpen(true);
        return;
      });

    setAlertOptions({
      severity: "success",
      title: "Onnistui!",
      message: values.name + " lisätty.",
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
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        confirmfunction={addSubject}
        functionparam={formik.values}
      ></ConfirmationDialog>
      <Container style={{ width: "85%", marginTop: "50px" }}>
        <Box style={{ backgroundColor: "rgba(52, 139, 147, 0.5 )" }}>
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
