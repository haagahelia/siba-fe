import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import dao from "../../ajax/dao";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";
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
  const { userId } = useContext(AppContext);
  const [departmentList, setDepartmentList] = useState([
    { id: 101, name: "Jazz" },
  ]);
  const [numberOfPrograms, setNumberOfPrograms] = useState(null);
  const [programNames, setProgramNames] = useState([]);

  // Fetches the number of programs for the department with the given id.
  const fetchNumberOfPrograms = async () => {
    const response = await dao.getListOfPrograms(singleDepartment?.id);
    if (response === null) {
      return "Error fetching number of programs";
    }
    const programNames = response.data.map((program) => program.name);
    setProgramNames(programNames);
    return programNames;
  };

  // Fetches the department id for the dialog.
  useEffect(() => {
    if (open && singleDepartment) {
      Logger.debug(
        `Rendering SingleDepartmentDialog for department: ${JSON.stringify(
          singleDepartment,
        )}`,
      );
      fetchNumberOfPrograms(singleDepartment.id)
        .then((data) => {
          setNumberOfPrograms(data.length);
          Logger.debug(data);
        })
        .catch((error) => {
          Logger.error(error);
        });
    }
  }, [open, singleDepartment]);

  // Fetches the department id, If the user is a planner, only the departments they are a planner of are fetched.
  const getDepartmentIdForDialog = async () => {
    if (roles.planner === "1") {
      Logger.debug("Fetching planner-specific Departments from server.");
      const response = await dao.fetchDepartmentplannerByUserId(userId);
      if (response.success) {
        setDepartmentList(response.data);
      } else {
        Logger.error("Error fetching planner Departments.");
      }
    }
  };

  useEffect(() => {
    getDepartmentIdForDialog();
  }, []);

  // Checks if the user is a planner of the department.
  const isPlannerOfDepartment =
    roles.planner === "1" &&
    departmentList.some((dept) => dept.id === singleProgram?.departmentId);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        getAllDepartments();
      }}
    >
      <DialogTitle id="dialog-title">
        Department: {singleDepartment?.name}
      </DialogTitle>
      <IconButton
        edge="end"
        onClick={() => setOpen(false)}
        aria-label="close"
        style={{ position: "absolute", top: "10px", right: "20px" }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        variant="sibaDialogContent2"
        style={{
          background: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="singleDialogSubtitle">
          <Tooltip
            title={`Space(s): ${programNames.slice(0, 5).join(", ")}`}
            placement="top"
          >
            {numberOfPrograms !== null
              ? numberOfPrograms === 0
                ? "There are no programs in this department."
                : numberOfPrograms === 1
                  ? "There is 1 program in this department."
                  : `There are ${numberOfPrograms} programs in this department.`
              : "Loading..."}
          </Tooltip>
        </Typography>
      </DialogContent>
      {(roles.admin === "1" || isPlannerOfDepartment) &&
        numberOfPrograms === 0 && (
          <DialogActions>
            <EditDepartment
              singleDepartment={singleDepartment}
              setSingleDepartment={setSingleDepartment}
              getAllDepartments={getAllDepartments}
              setOpen={setOpen}
              open={open}
            />
            <DeleteDepartment
              singleDepartment={singleDepartment}
              getAllDepartments={getAllDepartments}
              setOpen={setOpen}
            />
          </DialogActions>
        )}

      <DialogContent>
        <Grid container variant="sibaGridSingleItemDisplay" column={14}>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">id:&nbsp;</Typography>
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
