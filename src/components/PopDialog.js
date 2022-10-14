import React, { useEffect, useState } from "react";
import Axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Typography, Box, DialogActions } from "@mui/material";
import axios from "axios";
import AlertBox from "./AlertBox";
import ConfirmationDialog from "./ConfirmationDialog";
import EditSubject from "./EditSubject";


export default function PopUpDialog(props) {

  const {
    open,
    setOpen,
    data,
    setSingleSubject,
    submitDelete,
    setEditDialogOpen,
    setEditSubject
  } = props;

  const handeClose=() => {
    setOpen=(false);
  }

  return(
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">{data?.subjectName}</DialogTitle>
        <DialogContent>
          <DialogActions>
            <Button onClick={() => submitDelete(data.id)}>
                        Poista
            </Button>
            <Button onClick={() => {
              // Tallentaa editSubjectiin tiedot joita halutaan muokata
                      setEditSubject(data);
                      setEditDialogOpen(true);
                        }}
                      >
                        Muokkaa
            </Button>
          </DialogActions>
          <DialogContentText>
          <Grid
              container
              spacing={5}
              column={14}
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              padding={2}
            >
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Nimi:  
                  {data?.subjectName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Ryhmän koko:
                  {data?.groupSize}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Ryhmien määrä:
                  {data?.groupCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Tuntien pituus:
                  {data?.sessionLength}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Tuntien määrä:
                  {data?.sessionCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Pinta-ala(m2):
                  {data?.area}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Pääaine:
                  {data?.name}
                </Typography>
              </Grid>
          </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>

    </div>
  )
 
  }
  