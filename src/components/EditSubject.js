import React, { useState, useEffect, useTimeout } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, FormHelperText } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import FormControl from "@mui/material/FormControl";
import { Formik, useFormik } from "formik";
import ConfirmationDialog from "./ConfirmationDialog";
import {
  validate,
  capitalizeFirstLetter,
} from "../validation/ValidateEditSubject";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import AlertBox from "../components/AlertBox";

export default function EditSubject(props) {
  // Aina kun editSubject muuttuu subjectList.js filussa ne tiedot tulee tähän nimellä data
  const {
    editDialogOpen,
    setEditDialogOpen,
    data,
    getAllSubjects,
    setEditSubject,
  } = props;
  const [programNameList, setProgramNameList] = useState([]);
  // const [sub, setSub] = useState({});
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

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     let newSubjectObject = Object.create(data);
  //     console.log("newSubjectObject", newSubjectObject);
  //     setSub(newSubjectObject);
  //   }
  // }, [data]);

  // const handleChange = (event) => {
  //   console.log(event.target.name, event.target.value);
  //   setSub({ ...sub, [event.target.name]: event.target.value });
  // };

  // Object.create(data);
  const formik = useFormik({
    // Katsoo pitääkö Formikin nollata lomake, jos aloitusarvot muuttuvat
    enableReinitialize: true,
    initialValues: data,
    validate,
    onSubmit: (values) => {
      //  editSubject(values);
      setEditDialogOpen(false);

      setDialogOptions({
        title: "Haluatko varmasti muuttaa " + values.subjectName + " tietoja?",
        content:
          "Painamalla jatka, tallennat " +
          values.subjectName +
          " uudet tiedot. ",
      });
      setDialogOpen(true);
      return;
    },
  });

  function editSubject(values) {
    // console.log(values);
    let capitalName = capitalizeFirstLetter(values.subjectName);
    Axios.put("http://localhost:3001/api/subject/update", {
      name: capitalName,
      groupSize: values.groupSize,
      groupCount: values.groupCount,
      sessionLength: values.sessionLength,
      sessionCount: values.sessionCount,
      area: values.area,
      programId: values.programId,
      id: values.id,
    })
      .then((response) => {
        getAllSubjects();
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
      message: values.subjectName + " uudet tiedot lisätty.",
    });
    setAlertOpen(true);
    setTimeout(() => setAlertOpen(false), 6000);
  }

  const handleClose = () => {
    setEditSubject({
      id: null,
      name: null,
      groupSize: null,
      groupCount: null,
      sessionLength: null,
      sessionCount: null,
      area: null,
      programId: null,
      subjectName: null,
    });
    setEditDialogOpen(false);
  };

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
        confirmfunction={editSubject}
        functionparam={formik.values}
      ></ConfirmationDialog>
      {/* {data?.subjectName} Tässä ? katsoo löytyykö data objektista attribuuttia subjectName, jos ei löydy palauttaa arvon null eikä kaadu */}
      <Dialog open={editDialogOpen}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Muokkaa: {data?.subjectName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                spacing={2}
                column={7}
                direction="column"
                justifyContent="center"
                alignItems="center"
                padding={2}
              >
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.subjectName && formik.errors.subjectName
                        ? true
                        : false
                    }
                    name="subjectName"
                    label="Opetuksen nimi"
                    variant="outlined"
                    value={formik.values?.subjectName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.subjectName && formik.errors.subjectName
                        ? formik.errors.subjectName
                        : null
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.groupSize && formik.errors.groupSize
                        ? true
                        : false
                    }
                    name="groupSize"
                    label="Ryhmän koko"
                    variant="outlined"
                    value={formik.values?.groupSize}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.groupSize && formik.errors.groupSize
                        ? formik.errors.groupSize
                        : null
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.groupCount && formik.errors.groupCount
                        ? true
                        : false
                    }
                    name="groupCount"
                    label="Ryhmien määrä"
                    variant="outlined"
                    value={formik.values?.groupCount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.groupCount && formik.errors.groupCount
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
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
                    value={formik.values?.sessionLength}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.sessionLength &&
                      formik.errors.sessionLength
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.sessionCount && formik.errors.sessionCount
                        ? true
                        : false
                    }
                    name="sessionCount"
                    label="Opetuksien määrä viikossa"
                    variant="outlined"
                    value={formik.values?.sessionCount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.sessionCount && formik.errors.sessionCount
                    }
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={
                      formik.touched.area && formik.errors.area ? true : false
                    }
                    name="area"
                    label="Vaaditut neliömetrit"
                    variant="outlined"
                    value={formik.values?.area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.area && formik.errors.area}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: 225 }}>
                    {/* <InputLabel>Pääaine</InputLabel> */}
                    <Select
                      error={
                        formik.touched.programId && formik.errors.programId
                          ? true
                          : false
                      }
                      name="programId"
                      onChange={formik.handleChange}
                      value={formik.values?.programId}
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
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
            <Button onClick={handleClose}>Peruuta</Button>
            <Button type="submit">Jatka</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
