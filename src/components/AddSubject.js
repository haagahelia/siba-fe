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

export default function AddSubject() {
  const [programNameList, setProgramNameList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const [newSubject, setNewSubject] = useState({
    name: "",
    groupSize: 0,
    groupCount: 0,
    sessionLength: "",
    sessionCount: 0,
    area: 0,
    programId: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewSubject({ ...newSubject, [name]: value });
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
            message:
              "Oho! Jotain meni pieleen palvelimella. Pääaineita ei löytynyt",
          });
          setAlertOpen(true);
          return;
        }
      });
  }, []);

  const addSubject = () => {
    axios
      .post("http://localhost:3001/api/subject/post", {
        name: newSubject.name,
        groupSize: newSubject.groupSize,
        groupCount: newSubject.groupCount,
        sessionLength: newSubject.sessionLength,
        sessionCount: newSubject.sessionCount,
        area: newSubject.area,
        programId: newSubject.programId,
      })

      .then((response) => {
        const { data } = response;
        console.log(response);
        setNewSubject([...newSubject, data.result]);
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
                  name="name"
                  label="Aineen nimi"
                  variant="outlined"
                  value={newSubject.name}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="groupSize"
                  label="Ryhmän koko"
                  variant="outlined"
                  value={newSubject.groupSize}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="groupCount"
                  label="Ryhmien määrä"
                  variant="outlined"
                  value={newSubject.groupCount}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="sessionLength"
                  label="Opetuksen pituus"
                  variant="outlined"
                  value={newSubject.sessionLength}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="sessionCount"
                  label="Opetuksien määrä"
                  variant="outlined"
                  value={newSubject.sessionCount}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="area"
                  label="Vaaditut neliömetrit"
                  variant="outlined"
                  value={newSubject.area}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ m: 4, minWidth: 120 }}>
                <InputLabel>Pääaine</InputLabel>

                <Select
                  name="programId"
                  onChange={(e) => handleChange(e)}
                  value={newSubject.programId}
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
            <Button onClick={addSubject}>Lisää</Button>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
