import { useEffect, useState } from "react";
import dao from "../../ajax/dao";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AlertBox from "../common/AlertBox";
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
      <Dialog open={open} onClose={() => setOpen(false)} width="400px">
        <DialogTitle id="dialog-title">{singleUser?.email}</DialogTitle>
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
              spacing={1}
              column={14}
              direction="column"
            >
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  id:&nbsp;
                  {singleUser?.id}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  Email:&nbsp;
                  {singleUser?.email}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  isAdmin:&nbsp;
                  {singleUser?.isAdmin}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  isPlanner:&nbsp;
                  {singleUser?.isPlanner}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1">
                  isStatist:&nbsp;
                  {singleUser?.isStatist}
                </Typography>
              </Grid>
              <Grid item s={6}>
                <Typography variant="subtitle1"> Planner for:&nbsp;</Typography>
                <UserDepartmentList
                  departmentListByUserId={departmentListByUserId}
                  getDeparmentsByUserId={getDepartmentListByUserId}
                  getAllUsers={getAllUsers}
                  setOpen={setOpen}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
