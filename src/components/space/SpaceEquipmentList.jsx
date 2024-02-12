import { useState } from "react";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import AlertBox from "../common/AlertBox";
import DeleteSpaceEquip from "./DeleteSpaceEquip";

export default function SpaceEquipmentList({
  equipListBySpaceId,
  getEquipmentsBySpaceId,
}) {
  const { roles } = useRoleLoggedIn();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    title: "Error",
    severity: "error",
  });

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      {equipListBySpaceId.length ? (
        equipListBySpaceId.map((value) => {
          return (
            <div key={value.equipmentId}>
              <List>
                <ListItem>
                  {roles.admin === "1" && (
                    <DialogActions>
                      <DeleteSpaceEquip
                        setAlertOpen={setAlertOpen}
                        setAlertOptions={setAlertOptions}
                        singleSpaceEquipToDelete={value}
                        getEquipmentsBySpaceId={getEquipmentsBySpaceId}
                        subId={value.spaceId}
                      />
                    </DialogActions>
                  )}
                  <DialogContent>
                    <DialogContent variant="sibaDialogContent3">
                      <Grid item xs={12} sm={6}>
                        <Typography variant="boldTitle">
                          Name:&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="singleDialogSubtitle">
                          {value.name}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography variant="boldTitle">
                          Information:&nbsp;&nbsp;
                        </Typography>
                        <Typography variant="singleDialogSubtitle">
                          {value.description}
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
