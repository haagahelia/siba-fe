import { useEffect, useState } from "react";
import dao from "../../ajax/dao";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { checkForUserPrograms } from "../../hooks/checkForUserPrograms";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";
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
  userPrograms,
}) {
  const [equipListBySubId, setEquipListBySubId] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const [programs, setPrograms] = useState([]);

  const { roles } = useRoleLoggedIn();
  const getEquipmentsBySubId = async (subjectId) => {
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
    if (singleSubject && typeof singleSubject?.id === "number") {
      // console.log(`getEquipmentsBySubId(${singleSubject.id})`);
      setPrograms(checkForUserPrograms(singleSubject, userPrograms));
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
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          Logger.debug("Closing SingleSubjectDialog from onClose...");
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="dialog-title">
          Lesson: {singleSubject?.name}
        </DialogTitle>
        <IconButton
          edge="end"
          onClick={() => {
            setOpen(false);
            Logger.debug("Closing SingleSubjectDialog from IconButton...");
          }}
          aria-label="close"
          variant="closeButton"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {(roles.admin === "1" || (roles.planner === "1" && programs)) && (
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
          )}
          <DialogContent>
            <Grid container variant="sibaGridSingleItemDisplay" column={14}>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Name:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSubject?.name}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Group size:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSubject?.groupSize}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Group count:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSubject?.groupCount}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Length of lessons:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSubject?.sessionLength}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Number of sessions per week:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSubject?.sessionCount}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Required square meters:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSubject?.area}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Program:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSubject?.programName}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Space type:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSubject?.spaceTypeName}
                  </Typography>
                </Grid>
              </DialogContent>
            </Grid>
            <DialogContent>
              <Typography variant="boldTitle2">Equipment needs:</Typography>
              <SubjectEquipmentList
                equipListBySubId={equipListBySubId}
                getEquipmentsBySubId={getEquipmentsBySubId}
                singleSubject={singleSubject}
                userPrograms={userPrograms}
              />
            </DialogContent>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
