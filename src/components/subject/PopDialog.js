import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  DialogActions,
} from "@mui/material";

export default function PopUpDialog(props) {
  const {
    open,
    setOpen,
    data,
    setSingleSubject,
    submitDelete,
    setEditDialogOpen,
    setEditSubject,
  } = props;

  const handeClose = () => {
    setOpen = false;
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">{data?.subjectName}</DialogTitle>
        <DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => submitDelete(data)}
            >
              Poista
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
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
                  Nimi:&nbsp;
                  {data?.subjectName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Ryhmän koko:&nbsp;
                  {data?.groupSize}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Ryhmien määrä:&nbsp;
                  {data?.groupCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Tuntien pituus:&nbsp;
                  {data?.sessionLength}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Tuntien määrä:&nbsp;
                  {data?.sessionCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Pinta-ala(m2):&nbsp;
                  {data?.area}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Pääaine:&nbsp;
                  {data?.name}
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
