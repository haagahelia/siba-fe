import React, { useEffect, useState } from "react";
import dao from "../../ajax/dao";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AlertBox from "../common/AlertBox";
import AddSpaceEquipContainer from "./AddSpaceEquipContainer";
import DeleteSpace from "./DeleteSpace";
import EditSpaceContainer from "./EditSpaceContainer";
import SpaceEquipmentList from "./SpaceEquipmentList";

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
      getEquipmentsBySpaceId(singleSpace.id);
    }
  }, [singleSpace]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
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
            <EditSpaceContainer
              singleSpace={singleSpace}
              getAllSpaces={getAllSpaces}
              setSingleSpace={setSingleSpace}
            />
            <AddSpaceEquipContainer
              singleSpace={singleSpace}
              equipmentsBySpaceId={getEquipmentsBySpaceId}
            />
          </DialogActions>
          <DialogContent>
            <Grid
              container
              variant="sibaGridSingleItemDisplay"
              column={14}
              direction="column"

            >
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Name:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.name}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Area:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.area}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Information:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.info}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Maximum Persons Allowed:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.personLimit}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Available From:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.availableFrom}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Available To:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.availableTo}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Classes From:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.classesFrom}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Classes To:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.classesTo}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    In Use:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.inUse ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Space Type:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.spaceTypeName}{" "}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="boldTitle">
                    Building:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">
                    {singleSpace?.buildingName}{" "}
                  </Typography>
                </Grid>
              </DialogContent>

            </Grid>
          </DialogContent>
          <DialogContent>
            <Typography variant="boldTitle2">Equipment List:</Typography>
            <SpaceEquipmentList
              equipListBySpaceId={equipListBySpaceId}
              getEquipmentsBySpaceId={getEquipmentsBySpaceId}
            />
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
