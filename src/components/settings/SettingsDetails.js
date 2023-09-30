import {
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";
import AlertBox from "../common/AlertBox";
import DeleteSetting from "./DeleteSetting";
import EditSettingContainer from "./EditSettingContainer";

export default function SettingsDetails({
  open,
  setOpen,
  singleSetting,
  getAllSettings,
  incrementDataModifiedCounter,
  setSingleSetting,
}) {
  const { roles } = RoleLoggedIn();

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
          {roles.admin === "1" && (
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
          )}

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
        </DialogContent>
      </Dialog>
    </div>
  );
}
