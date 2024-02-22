import { useState } from "react";

import { DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { checkForUserPrograms } from "../../hooks/checkForUserPrograms";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import DeleteSubEquip from "./DeleteSubEquip";
import EditSubEquipContainer from "./EditSubEquipContainer";
import AlertBox from "../common/AlertBox";

export default function SubjectEquipmentList({
  equipListBySubId,
  getEquipmentsBySubId,
  userPrograms,
  singleSubject,
}) {
  const { roles } = useRoleLoggedIn();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      {equipListBySubId.length ? (
        equipListBySubId.map((value) => {
          return (
            <div key={value.equipmentId}>
              <List>
                <ListItem>
                  {(roles.admin === "1" ||
                    (roles.planner === "1" &&
                      checkForUserPrograms(singleSubject, userPrograms))) && (
                    <DialogActions>
                      <EditSubEquipContainer
                        subId={value.subjectId}
                        equipId={value.equipmentId}
                        prio={value.priority}
                        obli={value.obligatory}
                        name={value.name}
                        getEquipmentsBySubId={getEquipmentsBySubId}
                      />
                      <DeleteSubEquip
                        setAlertOpen={setAlertOpen}
                        setAlertOptions={setAlertOptions}
                        singleSubEquipToDelete={value}
                        getEquipmentsBySubId={getEquipmentsBySubId}
                        subId={value.subjectId}
                      />
                    </DialogActions>
                  )}
                  <DialogContent>
                    <DialogContent variant="sibaDialogContentSubjectEquipment">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="singleDialogSubtitle2">
                          Name:&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="singleDialogSubtitle2">
                          {value.name}
                        </Typography>
                      </Grid>
                    </DialogContent>
                    <DialogContent variant="sibaDialogContentSubjectEquipment">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="singleDialogSubtitle2">
                          Information:&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="singleDialogSubtitle2">
                          {value.description}
                        </Typography>
                      </Grid>
                    </DialogContent>
                    <DialogContent variant="sibaDialogContentSubjectEquipment">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="singleDialogSubtitle2">
                          Priority value:&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="singleDialogSubtitle2">
                          {value.priority}
                        </Typography>
                      </Grid>
                    </DialogContent>
                    <DialogContent variant="sibaDialogContentSubjectEquipment">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="singleDialogSubtitle2">
                          Mandatority :&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="singleDialogSubtitle2">
                          {" "}
                          {value.obligatory === 1
                            ? "Yes"
                            : value.obligatory === 0
                            ? "No"
                            : null}
                        </Typography>
                      </Grid>
                    </DialogContent>
                  </DialogContent>
                </ListItem>
              </List>
            </div>
          );
        })
      ) : (
        <Grid item xs={12} sm={6}>
          <Typography>No equipment added</Typography>
        </Grid>
      )}
    </div>
  );
}
