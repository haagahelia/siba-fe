import { useEffect, useState } from "react";
import dao from "../../ajax/dao";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AlertBox from "../common/AlertBox";
import AddSubEquipContainer from "./AddSubEquipContainer";
import DeleteSubject from "./DeleteSubject";
import EditSubjectContainer from "./EditSubjectContainer";
import SubjectEquipmentList from "./SubjectEquipmentList";

export default function SingleSubjectDialog({
  open,
  setOpen,
  singleSubject,
  getAllSubjects,
  setSingleSubject,
}) {
  const [equipListBySubId, setEquipListBySubId] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getEquipmentsBySubId = async function (subjectId) {
    const result = await dao.fetchEquipmentBySubjectId(subjectId);
    if (result.success === false) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong on the server. No equipment found",
      });
      setAlertOpen(true);
      return;
    } else {
      setEquipListBySubId(result.data);
      // console.log(`setEquipListBySubId(result): ${result.data.length}`);
      return result.data;
    }
  };

  useEffect(() => {
    // console.log(`singleSubject?.id${singleSubject?.id}`);
    // console.log(`singleSubject?.name${singleSubject?.name}`);
    if (singleSubject && typeof singleSubject.id === "number") {
      // console.log(`getEquipmentsBySubId(${singleSubject.id})`);
      getEquipmentsBySubId(singleSubject.id);
    }
  }, [singleSubject]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">
          {singleSubject?.subjectName}
        </DialogTitle>
        <DialogContent>
          <DialogActions>
            <DeleteSubject
              singleSubject={singleSubject}
              getAllSubjects={getAllSubjects}
              setOpen={setOpen}
            />
            <EditSubjectContainer
              singleSubject={singleSubject}
              getAllSubjects={getAllSubjects}
              setSingleSubject={setSingleSubject}
            />
            <AddSubEquipContainer
              singleSubject={singleSubject}
              equipmentsBySubId={getEquipmentsBySubId}
            />
          </DialogActions>
          <DialogContent>
            <Grid
              container
              variant="sibaGridSingleItemDisplay"
              spacing={1}
              column={14}
              direction="column"
            >
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Name:&nbsp;
                  {singleSubject?.subjectName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Group size:&nbsp;
                  {singleSubject?.groupSize}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Group count:&nbsp;
                  {singleSubject?.groupCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Length of lessons:&nbsp;
                  {singleSubject?.sessionLength}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Number of hours:&nbsp;
                  {singleSubject?.sessionCount}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Required square meters:&nbsp;
                  {singleSubject?.area}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Major:&nbsp;
                  {singleSubject?.programName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Room type:&nbsp;
                  {singleSubject?.spaceTypeName}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">Equipment needs:</Typography>
                <SubjectEquipmentList
                  equipListBySubId={equipListBySubId}
                  getEquipmentsBySubId={getEquipmentsBySubId}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
