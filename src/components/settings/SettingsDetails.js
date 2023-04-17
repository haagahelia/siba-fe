import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import AlertBox from "../common/AlertBox";
import DeleteSetting from "./DeleteSetting";
import EditSettingContainer from "./EditSettingContainer";

export default function SettingsDetails(props) {
  const {
    open,
    setOpen,
    singleSetting,
    getAllSettings,
    incrementDataModifiedCounter,
    setSingleSetting,
  } = props;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions] = useState({
    title: "This is alert title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="dialog-title">{singleSetting?.name}</DialogTitle>
        <DialogContent>
          <DialogActions>
            <DeleteSetting
              singleSetting={singleSetting}
              getAllSettings={getAllSettings}
              incrementDataModifiedCounter={incrementDataModifiedCounter}
              setOpen={setOpen}
            />
            <EditSettingContainer
              singleSetting={singleSetting}
              getAllSettings={getAllSettings}
              setSingleSetting={setSingleSetting}
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
                  Name:&nbsp;
                  {singleSetting?.name}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Description:&nbsp;
                  {singleSetting?.description}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  textValue:&nbsp;
                  {singleSetting?.textValue}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  numberValue:&nbsp;
                  {singleSetting?.numberValue}
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
