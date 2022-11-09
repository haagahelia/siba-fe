import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";
import DeleteSubject from "./DeleteSubject";
import EditSubject from "./EditSubject";
import AddSubjectEquipment from "./AddSubjectEquipment";

export default function PopUpDialog(props) {
  const { open, setOpen, data, refreshSubjects } = props;

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
            <DeleteSubject
              data={data}
              refreshSubjects={refreshSubjects}
            />
            <EditSubject data={data} refreshSubjects={refreshSubjects} />
            <AddSubjectEquipment data={data} />
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
                <Typography variant="subtitle1" color="black">
                  Nimi:&nbsp;
                  {data?.subjectName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1" color="black">
                  Ryhmän koko:&nbsp;
                  {data?.groupSize}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1" color="black">
                  Ryhmien määrä:&nbsp;
                  {data?.groupCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1" color="black">
                  Tuntien pituus:&nbsp;
                  {data?.sessionLength}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1" color="black">
                  Tuntien määrä:&nbsp;
                  {data?.sessionCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1" color="black">
                  Pinta-ala(m2):&nbsp;
                  {data?.area}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1" color="black">
                  Pääaine:&nbsp;
                  {data?.programName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1" color="black">
                  Huoneen tyyppi:&nbsp;
                  {data?.spaceTypeName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1" color="black">
                  Varuste tarve:&nbsp;
                  {data?.equipmentName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1" color="black">
                  Varusteen tiedot:&nbsp;
                  {data?.description}
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
