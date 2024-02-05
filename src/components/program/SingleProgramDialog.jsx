import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import dao from "../../ajax/dao";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";
import DeleteProgram from "./DeleteProgram";
import EditProgram from "./EditProgram";

export default function SingleProgramDialog({
  open,
  setOpen,
  singleProgram,
  setSingleProgram,
  getAllPrograms,
}) {
  Logger.logPrefix = "SingleProgramDialog";

  const { roles } = useRoleLoggedIn();
  const { userId } = useContext(AppContext);
  const [departmentList, setDepartmentList] = useState([
    { id: 101, name: "Jazz" },
  ]);
  const [numberOfLessons, setNumberOfLessons] = useState(null);

  const fetchNumberOfLessons = async () => {
    const response = await dao.getNumberOfLessons(singleProgram?.id);
    const num = response;
    const value = num["count(*)"];
    return value;
  };

  useEffect(() => {
    if (open && singleProgram) {
      Logger.debug(
        `Rendering SingleProgramDialog for program: ${JSON.stringify(
          singleProgram,
        )}`,
      );
      fetchNumberOfLessons(singleProgram.id)
        .then((number) => {
          setNumberOfLessons(number);
          console.log("Number of lessons:", number);
        })
        .catch((error) =>
          Logger.error("Error fetching the number of lessons:", error),
        );
    }
  }, [open, singleProgram]);

  const getDepartmentIdForDialog = async () => {
    if (roles.planner === "1") {
      Logger.debug("Fetching planner-specific Departments from server.");
      const response = await dao.fetchDepartmentplannerByUserId(userId);
      if (response.success) {
        setDepartmentList(response.data);
        console.log(response.data);
      } else {
        Logger.debug("Error fetching planner Departments.");
      }
    }
  };

  useEffect(() => {
    getDepartmentIdForDialog();
  }, []);

  const isPlannerOfDepartment =
    roles.planner === "1" &&
    departmentList.some((dept) => dept.id === singleProgram?.departmentId);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        getAllPrograms();
      }}
    >
      <DialogTitle id="dialog-title">{`Program: ${singleProgram?.name}`}</DialogTitle>
      <IconButton
        edge="end"
        color="inherit"
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
          {numberOfLessons !== null
            ? numberOfLessons === 0
              ? "There are no lessons in this program."
              : `There are ${numberOfLessons} lessons in this program.`
            : "Loading..."}
        </Typography>
      </DialogContent>
      {(roles.admin === "1" || isPlannerOfDepartment) &&
        numberOfLessons === 0 && (
          <DialogActions>
            <DeleteProgram
              singleProgram={singleProgram}
              getAllPrograms={getAllPrograms}
              setOpen={setOpen}
            />
            <EditProgram
              singleProgram={singleProgram}
              setSingleProgram={setSingleProgram}
              getAllPrograms={getAllPrograms}
              open={open}
              setOpen={setOpen}
            />
          </DialogActions>
        )}
      <DialogContent>
        <Grid container variant="sibaGridSingleItemDisplay" column={14}>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">id:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleProgram?.id}
              </Typography>
            </Grid>
          </DialogContent>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">Name:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleProgram?.name}
              </Typography>
            </Grid>
          </DialogContent>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                Department id:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleProgram?.departmentId}
              </Typography>
            </Grid>
          </DialogContent>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                Department Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleProgram?.departmentName}
              </Typography>
            </Grid>
          </DialogContent>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
