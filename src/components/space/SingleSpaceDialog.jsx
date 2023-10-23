import React, { useEffect, useState } from "react";
import dao from "../../ajax/dao";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AlertBox from "../common/AlertBox";
import DeleteSpace from "./DeleteSpace";

export default function SingleSpaceDialog({
  open,
  setOpen,
  singleSpace,
  getAllSpaces,
  setSingleSpace,
}) {
  const [equipListBySpaceId, setEquipListBySpaceId] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getEquipmentsBySpaceId = async function (spaceId) {
    const result = await dao.fetchEquipmentBySpaceId(spaceId);
    if (result.success === false) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong on the server. No equipment found",
      });
      setAlertOpen(true);
      return;
    } else {
      setEquipListBySpaceId(result.data);
      return result.data;
    }
  };

  useEffect(() => {
    if (singleSpace && typeof singleSpace.id === "number") {
      //getEquipmentsBySpaceId(singleSpace.id);
    }
  }, [singleSpace]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <CloseIcon />
          </IconButton>
          {singleSpace?.name}
        </DialogTitle>
        <DialogContent>
          <DialogActions>
            <DeleteSpace
              singleSpace={singleSpace}
              getAllSpaces={getAllSpaces}
              setOpen={setOpen}
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
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  Name:&nbsp;
                  {singleSpace?.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  Area:&nbsp;
                  {singleSpace?.area}
                </Typography>
              </Grid>
              {/* Add more space details here */}
            </Grid>
            <Typography variant="subtitle1">Equipment List:</Typography>
            {/* Render equipment list here */}
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
