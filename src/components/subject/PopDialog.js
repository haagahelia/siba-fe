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
import AddSubEquipContainer from "./AddSubEquipContainer";
import SubjectEquipmentList from "./SubjectEquipmentList";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";

export default function PopUpDialog(props) {
  const { open, setOpen, singleSubject, getAllSubjects, setSingleSubject } =
    props;

  const [equipListBySubId, setEquipListBySubId] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getEquipmentsBySubId = async function (subjectId) {
    const result = await dao.fetchEquipmentBySubjectId(subjectId);
    if (result === 500) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen palvelimella. Varusteita ei löytynyt",
      });
      setAlertOpen(true);
      return;
    } else {
      setEquipListBySubId(result);
      return result;
    }
  };

  useEffect(() => {
    if (singleSubject?.id) {
      getEquipmentsBySubId(singleSubject?.id);
    }
  }, []);

  // useEffect(() => {
  //   getAllSubjects();
  // });

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">
          {singleSubject?.subjectName}
        </DialogTitle>
        <DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
            <DeleteSubject
              singleSubject={singleSubject}
              getAllSubjects={getAllSubjects}
              setOpen={setOpen}
            />
            <EditSubject
              singleSubject={singleSubject}
              getAllSubjects={getAllSubjects}
              setSingleSubject={setSingleSubject}
            />
            <AddSubEquipContainer
              singleSubject={singleSubject}
              equipmentsBySubId={getEquipmentsBySubId}
            />
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
                  {singleSubject?.subjectName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Ryhmän koko:&nbsp;
                  {singleSubject?.groupSize}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Ryhmien määrä:&nbsp;
                  {singleSubject?.groupCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Tuntien pituus:&nbsp;
                  {singleSubject?.sessionLength}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Tuntien määrä:&nbsp;
                  {singleSubject?.sessionCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Vaaditut neliömetrit:&nbsp;
                  {singleSubject?.area}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Pääaine:&nbsp;
                  {singleSubject?.programName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Huoneen tyyppi:&nbsp;
                  {singleSubject?.spaceTypeName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">Varuste tarpeet:</Typography>
                <SubjectEquipmentList
                  equipListBySubId={equipListBySubId}
                  getEquipmentsBySubId={getEquipmentsBySubId}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
