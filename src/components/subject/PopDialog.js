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
import SubjectEquipmentList from "./SubjectEquipmentList";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";

export default function PopUpDialog(props) {
  const { open, setOpen, data, refreshSubjects } = props;

  const [equipmentNamesList, setEquipmentNamesList] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const equipmentNames = async function (subjectId) {
    const data = await dao.getEquipmentBySubjectId(subjectId);
    if (data === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen palvelimella. Varusteita ei löytynyt",
      });
      setAlertOpen(true);
      return;
    } else {
      setEquipmentNamesList(data);
      return data;
    }
  };

  useEffect(() => {
    if (data?.id) {
      equipmentNames(data?.id);
    }
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      ></AlertBox>
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">{data?.subjectName}</DialogTitle>
        <DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
            <DeleteSubject
              data={data}
              refreshSubjects={refreshSubjects}
              setOpen={setOpen}
            ></DeleteSubject>
            <EditSubject data={data} refreshSubjects={refreshSubjects} />
            <AddSubjectEquipment data={data} equipmentNames={equipmentNames} />
          </DialogActions>
          <DialogContentText>
            <Grid
              container
              spacing={1}
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
                  Vaaditut neliömetrit:&nbsp;
                  {data?.area}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Pääaine:&nbsp;
                  {data?.programName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Huoneen tyyppi:&nbsp;
                  {data?.spaceTypeName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">Varuste tarpeet:</Typography>
                <SubjectEquipmentList
                  equipmentNamesList={equipmentNamesList}
                  equipmentNames={equipmentNames}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
