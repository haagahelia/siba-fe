import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AlertBox from "../common/AlertBox";
import DeleteAllocRound from "./DeleteAllocRound";
import EditAllocRound from "./EditAllocRound";
import SelectAllocRound from "./SelectAllocRound";

export default function AllocRoundDetails({
  open,
  setOpen,
  singleAllocRound,
  getAllAllocRounds,
  setSingleAllocRound,
  incrementDataModifiedCounter,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions] = useState({
    title: "This is alert title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const handleClose = (allocRoundId) => {
    setOpen(false);
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle id="dialog-title">
          Allocation round (Simulation round): {singleAllocRound?.name}
        </DialogTitle>
        <IconButton
          edge="end"
          onClick={() => setOpen(false)}
          aria-label="close"
          variant="closeButton"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogActions>
            {!singleAllocRound?.isReadOnly && (
              <DeleteAllocRound
                singleAllocRound={singleAllocRound}
                getAllAllocRounds={getAllAllocRounds}
                incrementDataModifiedCounter={incrementDataModifiedCounter}
                setOpen={setOpen}
              />
            )}
            <EditAllocRound
              singleAllocRound={singleAllocRound}
              getAllAllocRounds={getAllAllocRounds}
              setSingleAllocRound={setSingleAllocRound}
              incrementDataModifiedCounter={incrementDataModifiedCounter}
            />
            <SelectAllocRound
              singleAllocRound={singleAllocRound}
              getAllAllocRounds={getAllAllocRounds}
              setSingleAllocRound={setSingleAllocRound}
            />
          </DialogActions>
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
                    {singleAllocRound?.name}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Modifiable:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleAllocRound?.isReadOnly ? "❌" : "✅"}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Description:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleAllocRound?.description}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Created:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleAllocRound?.date}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Last modified:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleAllocRound?.lastModified}
                  </Typography>
                </Grid>
              </DialogContent>
            </Grid>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
