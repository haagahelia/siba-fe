import { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Dialog,
  DialogContent,
  //DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";
import AlertBox from "../common/AlertBox";
import DeleteAllocRound from "./DeleteAllocRound";
import EditAllocRound from "./EditAllocRound";
import SelectAllocRound from "./SelectAllocRound";

export default function AllocRoundDetails(props) {
  const {
    open,
    setOpen,
    singleAllocRound,
    getAllAllocRounds,
    setSingleAllocRound,
    incrementDataModifiedCounter,
  } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
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
      <Dialog open={open} onClose={handleClose} width="400px">
        <DialogTitle id="dialog-title">{singleAllocRound?.name}</DialogTitle>
        <DialogContent>
          <DialogActions>
            <EditAllocRound
              singleAllocRound={singleAllocRound}
              getAllAllocRounds={getAllAllocRounds}
              setSingleAllocRound={setSingleAllocRound}
              incrementDataModifiedCounter={incrementDataModifiedCounter}
            />
            <DeleteAllocRound
              singleAllocRound={singleAllocRound}
              getAllAllocRounds={getAllAllocRounds}
              incrementDataModifiedCounter={incrementDataModifiedCounter}
              setOpen={setOpen}
            />
            <SelectAllocRound
              singleAllocRound={singleAllocRound}
              getAllAllocRounds={getAllAllocRounds}
              setSingleAllocRound={setSingleAllocRound}
            />
          </DialogActions>
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
                {singleAllocRound?.name}
              </Typography>
            </Grid>
            <Grid item s={6}>
              <Typography variant="subtitle1">
                Description:&nbsp;
                {singleAllocRound?.description}
              </Typography>
            </Grid>
            <Grid item s={6}>
              <Typography variant="subtitle1">
                Last modified:&nbsp;
                {singleAllocRound?.lastModified}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
