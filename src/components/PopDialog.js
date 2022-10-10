import React, { useEffect, useState } from "react";
import Axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Typography, Box } from "@mui/material";
import axios from "axios";
import AlertBox from "./AlertBox";
import ConfirmationDialog from "./ConfirmationDialog";
import EditSubject from "./EditSubject";
import PopDialog from "./PopDialog";

export default function PopUpDialog() {


  const [subjectList, setSubjectList] = useState([]);

  const getAllSubjects = () => {
       Axios.get("http://localhost:3001/api/subject/getAll")
         .then((response) => {
           setSubjectList(response.data);
         })

     };
     return (
      <div>
        <Box>
          <nav>
            {subjectList.map((value) => {
              return (
                <List key={value.id}>
                  <ListItem disablePadding
                   >
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
  