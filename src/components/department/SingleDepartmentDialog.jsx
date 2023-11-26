import { useEffect } from "react";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteDepartment from "./DeleteDepartment";
import EditDepartment from "./EditDepartment";

export default function SingleDepartmentDialog({
  open,
  setOpen,
  singleDepartment,
  setSingleDepartment,
  getAllDepartments,
}) {
  Logger.logPrefix = "SingleDepartmentDialog";

  const { roles } = useRoleLoggedIn();

  useEffect(() => {
    if (open && singleDepartment) {
      Logger.debug(
        `Rendering SingleDepartmentDialog for department: ${JSON.stringify(
          singleDepartment,
        )}`,
      );
    }
  }, [open, singleDepartment]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        getAllDepartments();
      }}
    >
      <DialogTitle id="dialog-title">Department Info</DialogTitle>
      <IconButton
        edge="end"
        color="inherit"
        onClick={() => setOpen(false)}
        aria-label="close"
        style={{ position: "absolute", top: "10px", right: "20px" }}
      >
        <CloseIcon />
      </IconButton>
      {roles.admin === "1" && (
        <DialogActions>
          <DeleteDepartment
            singleDepartment={singleDepartment}
            getAllDepartments={getAllDepartments}
            setOpen={setOpen}
          />
          <EditDepartment
            singleDepartment={singleDepartment}
            setSingleDepartment={setSingleDepartment}
            getAllDepartments={getAllDepartments}
            open={open}
            setOpen={setOpen}
          />
        </DialogActions>
      )}
      <DialogContent>
        <Grid
          container
          variant="sibaGridSingleItemDisplay"
          column={14}
        >
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                id:&nbsp;
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleDepartment?.id}
              </Typography>
            </Grid>
          </DialogContent>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                Name:&nbsp;
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleDepartment?.name}
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
                {singleDepartment?.description}
              </Typography>
            </Grid>
          </DialogContent>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
