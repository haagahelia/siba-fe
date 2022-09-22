import React, { useEffect, useState } from "react";
import Axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import AlertBox from "./AlertBox";

export default function SubjectList() {
  const [subjectList, setSubjectList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getAllSubjects = () => {
    Axios.get("http://localhost:3001/api/subject/getAll")
      .then((response) => {
        setSubjectList(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setAlertOptions({
            severity: "error",
            message:
              "Oho! Jotain meni pieleen palvelimella. Aineita ei löytynyt",
          });
          setAlertOpen(true);
          return;
        }
      });
  };
  useEffect(() => {
    getAllSubjects();
  }, []);

  const deleteSubject = (id) => {
    axios
      .delete(`http://localhost:3001/api/subject/delete/${id}`)
      .then((_) => {
        getAllSubjects();
        setAlertOptions({
          severity: "success",
          message: "Aine poistettu",
        });
        setAlertOpen(true);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setAlertOptions({
            severity: "error",
            message: "Oho! Aineen poisto epäonnistui",
          });
          setAlertOpen(true);
          return;
        }
      });
  };

  // STYLES
  const Box = styled(Paper)(({ theme }) => ({
    overflow: "auto",
  }));

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      ></AlertBox>
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
                      Nimi:
                    </Typography>
                    <ListItemText
                      primary={value.subjectName}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  <Grid item md={2} xs={3} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Ryhmän koko:
                    </Typography>
                    <ListItemText
                      primary={value.groupSize}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  <Grid item md={2} xs={2} padding={2}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Ryhmien määrä:
                    </Typography>
                    <ListItemText
                      primary={value.groupCount}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Tuntien pituus:
                    </Typography>
                    <ListItemText
                      primary={value.sessionLength}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Tuntien määrä:
                    </Typography>
                    <ListItemText
                      primary={value.sessionCount}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  <Grid item md={2} xs={2} padding={3}>
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "bold" }}
                    >
                      Pinta-ala:
                    </Typography>
                    <ListItemText
                      primary={value.area}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
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
                      Pääaine:
                    </Typography>
                    <ListItemText
                      primary={value.name}
                      primaryTypographyProps={{
                        variant: "body2",
                      }}
                    ></ListItemText>
                  </Grid>
                  {/*HUOM! Delete toimii, mutta sivu pitää refreshaa jotta näkyy.
                     Lisäks delete buttonin sijainti voi aiheuttaa ongelmia dialogin kanssa kun/ jos tulee kaksi hover päälleikkäin. Sama juttu update */}
                  <Grid item md={3} xs={7} padding={2}>
                    <ListItemText>
                      <Button
                        onClick={() => {
                          deleteSubject(value.id);
                        }}
                      >
                        Poista
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
