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
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
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
  shownSpace,
}) {
  const [equipListBySpaceId, setEquipListBySpaceId] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const { roles } = useRoleLoggedIn();

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
    (() => {
      if (shownSpace) {
        setSingleSpace(shownSpace);
      }
    })();
  }, [shownSpace]);

  useEffect(() => {
    if (singleSpace && typeof singleSpace.id === "number") {
      getEquipmentsBySpaceId(singleSpace.id);
    }
  }, [singleSpace]);

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="dialog-title">Space: {singleSpace?.name}</DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setOpen(false)}
          aria-label="close"
          style={{ position: "absolute", top: "10px", right: "20px" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {(roles.admin === "1" || roles.planner === "1") && (
            <DialogActions>
              <DeleteSpace
                singleSpace={singleSpace}
                getAllSpaces={getAllSpaces}
                setOpen={setOpen}
              />
              {singleSpace ? (
                <EditSpaceContainer
                  singleSpace={singleSpace}
                  getAllSpaces={getAllSpaces}
                  setSingleSpace={setSingleSpace}
                />
              ) : (
                ""
              )}

              {singleSpace ? (
                <AddSpaceEquipContainer
                  singleSpace={singleSpace}
                  equipmentsBySpaceId={getEquipmentsBySpaceId}
                />
              ) : (
                ""
              )}
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
                    {singleSpace?.name}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Area:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSpace?.area}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Information:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSpace?.info}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Maximum Persons Allowed:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSpace?.personLimit}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Available From:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSpace?.availableFrom}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Available To:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSpace?.availableTo}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Classes From:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSpace?.classesFrom}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Classes To:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSpace?.classesTo}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    In Use:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSpace?.inUse ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Space Type:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleSpace?.spaceTypeName}{" "}
                  </Typography>
                </Grid>
              </DialogContent>

              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Building:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
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
    </>
  );
}
