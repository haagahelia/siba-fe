import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";
import AlertBox from "../common/AlertBox";
import DeleteBuilding from "./DeleteBuilding";
import EditBuildingContainer from "./EditBuildingContainer";

export default function SingleBuildingDialog(props) {
  const { open, setOpen, singleBuilding, getAllBuildings, setSingleBuilding } =
    props;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  return (
    <React.Fragment>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">{singleBuilding?.name}</DialogTitle>
        <DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
            <DeleteBuilding
              singleBuilding={singleBuilding}
              getAllBuildings={getAllBuildings}
              setOpen={setOpen}
            />
            <EditBuildingContainer
              singleBuilding={singleBuilding}
              getAllBuildings={getAllBuildings}
              setSingleBuilding={setSingleBuilding}
            />
          </DialogActions>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            padding={2}
          >
            <Grid item xs={6}>
              <DialogContentText>
                <Typography variant="subtitile1">
                  Name:&nbsp;
                  {singleBuilding?.name}
                </Typography>
              </DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <DialogContentText>
                <Typography variant="subtitile1">
                  Description:&nbsp;
                  {singleBuilding?.description}
                </Typography>
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
