import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
//import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
//import axios from "axios";

import dao from "../../ajax/dao";

//const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

export default function SubjectList() {
  const [subjectList, setSubjectList] = useState([]);

  const refreshSubjects = async function () {
    const data = await dao.fetchSubjects();
    setSubjectList(data);
  };

  useEffect(() => {
    // ...do something ONLY when component did mount
    // Notice: even if categories state change => not fired
    refreshSubjects();
  }, []);

  const deleteSubject = (id) => {
    if (dao.deleteOneSubjectById(id)) {
      //console.log("Delete Subject succesful!"); // Toimii...
      refreshSubjects(); // ...tämäkin toimii, muttei johda heti refreshiin.
    } else {
      //console.log("Delete Subject failed!");
    }
  };

  // STYLES
  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));

  // Tämän componentin voinee jakaa muutamaan alikomponenttiin,
  // että tiedoston pituus lyhenisi.
  // TODO
  return (
    <div>
      <Box>
        <nav>
          {subjectList.map((value) => {
            return (
              <List key={value.id}>
                <ListItem disablePadding>
                  <Grid item md={3} xs={7} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Name:
                    </Typography>
                    <ListItemText
                      primary={value.subjectName}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={3} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Group size:
                    </Typography>
                    <ListItemText
                      primary={value.groupSize}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={2} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Group count:
                    </Typography>
                    <ListItemText
                      primary={value.groupCount}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Session length:
                    </Typography>
                    <ListItemText
                      primary={value.sessionLength}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Session count:
                    </Typography>
                    <ListItemText
                      primary={value.sessionCount}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Area:
                    </Typography>
                    <ListItemText
                      primary={value.area}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  {/*
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Program id:
                    </Typography>
                    <ListItemText
                      primary={value.programId}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                 */}
                  <Grid item md={3} xs={7} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Program name:
                    </Typography>
                    <ListItemText
                      primary={value.name}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    />
                  </Grid>
                  {/*HUOM! Delete toimii, mutta sivu pitää refreshaa jotta näkyy.
                     Lisäks delete buttonin sijainti voi aiheuttaa ongelmia dialogin kanssa kun/ jos tulee kaksi hover päälleikkäin. Sama juttu update */}
                  <Grid item md={3} xs={7} padding={2}>
                    <ListItemText>
                      {" "}
                      <Button
                        onClick={() => {
                          deleteSubject(value.id);
                        }}
                      >
                        Delete
                      </Button>
                    </ListItemText>
                  </Grid>
                </ListItem>
                <Divider />
              </List>
            );
          })}
        </nav>
      </Box>
    </div>
  );
}
