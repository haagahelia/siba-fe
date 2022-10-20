import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
//import { styled } from "@mui/material/styles";
//import Paper from "@mui/material/Paper";
//import axios from "axios";
import dao from "../../ajax/dao";

//const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

const emptySubject = {
  name: "",
  groupSize: 0,
  groupCount: 0,
  sessionLength: "",
  sessionCount: 0,
  area: 0,
  programId: 3001, // TODO: Tää ei paras ratkaisu, mitä jos lista tyhjä, tai 3001 poistettu
}

export default function AddSubject() {
  const [programNameList, setProgramNameList] = useState([]);
  const [newSubject, setNewSubject] = useState({...emptySubject});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewSubject({ ...newSubject, [name]: value });
  };



  useEffect(() => {

    const getProgramNames = async () => {
      let data = await dao.getProgramNames();
      setProgramNameList(data);
    }
    
    getProgramNames();
  }, []);

  const addSubject = async () => {
    console.log("tämä on subjectio jota yritetään lähettää ", newSubject);
  /*
       {
          name: newSubject.name,
          groupSize: newSubject.groupSize,
          groupCount: newSubject.groupCount,
          sessionLength: newSubject.sessionLength,
          sessionCount: newSubject.sessionCount,
          area: newSubject.area,
          programId: newSubject.programId,
        }
  */
    let insertId = await dao.postNewSubject(newSubject);
    if(insertId && !isNaN(insertId) ) {
      // const { data } = response;
      console.log("Id of newly added subject in an array: " + insertId);
      setNewSubject({...emptySubject});
    } else {
      console.log("Adding Subject failed");
    }
  };

  return (
    <div>
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
            <Button onClick={addSubject}>Add</Button>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
