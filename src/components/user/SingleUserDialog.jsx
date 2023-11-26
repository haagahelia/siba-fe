import { useEffect, useState } from "react";
import dao from "../../ajax/dao";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AlertBox from "../common/AlertBox";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AddDepartmentPlannerContainer from "./AddDepartmentPlannerContainer";
import DeleteUser from "./DeleteUser";
import EditUserContainer from "./EditUserContainer";
import UserDepartmentList from "./UserDepartmentList";

export default function SingleUserDialog({
  open,
  setOpen,
  singleUser,
  getAllUsers,
  setSingleUser,
}) {
  const [departmentListByUserId, setDepartmentListByUserId] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const getDepartmentListByUserId = async function (userId) {
    const result = await dao.fetchDepartmentplannerByUserId(userId);
    if (result.success === false) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message:
          "Something went wrong on the server. No departmentplanners found",
      });
      setAlertOpen(true);
      return;
    } else {
      setDepartmentListByUserId(result.data);
      return result.data;
    }
  };

  useEffect(() => {
    if (singleUser && typeof singleUser.id === "number") {
      getDepartmentListByUserId(singleUser.id);
    }
  }, [singleUser]);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        open={setAlertOpen}
      />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle id="dialog-title">{singleUser?.email}</DialogTitle>
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
          <DialogActions>
            <DeleteUser
              singleUser={singleUser}
              getAllUsers={getAllUsers}
              setOpen={setOpen}
            />
            <EditUserContainer
              singleUser={singleUser}
              getAllUsers={getAllUsers}
              setSingleUser={setSingleUser}
            />
            <AddDepartmentPlannerContainer
              singleUser={singleUser}
              getDeparmentsByUserId={getDepartmentListByUserId}
              getAllUsers={getAllUsers}
            />
          </DialogActions>
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
                    {singleUser?.id}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    Email:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleUser?.email}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    isAdmin:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleUser?.isAdmin ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    isPlanner:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleUser?.isPlanner ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent variant="sibaDialogContent2">
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    isStatist:&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="singleDialogSubtitle">
                    {singleUser?.isStatist ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </DialogContent>
              <DialogContent>
                <Typography variant="boldTitle2"> Planner for:</Typography>
                <UserDepartmentList
                  departmentListByUserId={departmentListByUserId}
                  getDeparmentsByUserId={getDepartmentListByUserId}
                  getAllUsers={getAllUsers}
                  setOpen={setOpen}
                />
              </DialogContent>
            </Grid>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
