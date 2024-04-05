import CloseIcon from "@mui/icons-material/Close";
import { Button, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Fragment, useContext, useEffect, useState } from "react";
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
  const [departmentList, setDepartmentList] = useState([]); //([{ id: -1, name: "N/A" },]);
  const [numberOfPrograms, setNumberOfPrograms] = useState(null);
  const [namesOfPrograms, setNamesOfPrograms] = useState([]);
  const [isPlannerForThisDepartment, setIsPlannerForThisDepartment] =
    useState(false);

  // Fetches the number of programs for the department with the given id.
  const fetchNumberOfPrograms = async () => {
    const response = await dao.getNumberOfPrograms(singleDepartment?.id);
    if (response === null) {
      return "Error fetching number of programs";
    }
    const num = response.data;
    const programCount = num["count(*)"];
    return programCount;
  };

  // fetches the first five program names for the department with the given id.
  const fetchFirstFiveProgramNames = async () => {
    const response = await dao.getProgramsFirstFiveNames(singleDepartment?.id);
    if (response.httpStatus !== 200) {
      return "Error fetching first five program names";
    }
    const displayFirstFiveNames = response.data.map((program) => program.name);
    return displayFirstFiveNames;
  };

  // Fetches the number of programs by department id for the dialog.
  useEffect(() => {
    if (open && singleDepartment) {
      Logger.debug(
        `Rendering SingleDepartmentDialog for department: ${JSON.stringify(
          singleDepartment,
        )}`,
      );
      fetchNumberOfPrograms(singleDepartment.id)
        .then((data) => {
          setNumberOfPrograms(data);
        })
        .catch((error) => {
          Logger.error(error);
        });
    }
  }, [open, singleDepartment]);

  // Fetches the first five program names by dept id for the dialog.
  useEffect(() => {
    if (open && singleDepartment) {
      Logger.debug(
        `Rendering SingleDepartmentDialog for department: ${JSON.stringify(
          singleDepartment,
        )}`,
      );
      fetchFirstFiveProgramNames(singleDepartment.id)
        .then((data) => {
          setNamesOfPrograms(data);
        })
        .catch((error) => {
          Logger.error(error);
        });
    }
  }, [open, singleDepartment]);

  // Fetches the department id, If the user is a planner, only the departments they are a planner of are fetched.
  const checkIfUserPlannerForThisDepartment = async () => {
    if (roles.planner === "1") {
      Logger.debug("Fetching planner-specific Departments from server.");
      const response = await dao.fetchDepartmentplannerByUserId(userId);
      if (response.success) {
        setDepartmentList(response.data);

        // Check if the user is a planner of this department.
        setIsPlannerForThisDepartment(
          roles.planner === "1" &&
            departmentList.some((dept) => dept.id === singleDepartment?.id),
        );
      } else {
        Logger.error("Error fetching planner Departments.");
      }
    }
  };

  useEffect(() => {
    checkIfUserPlannerForThisDepartment();
  }, [singleDepartment]);

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
        variant="closeButton"
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
          {`${
            isPlannerForThisDepartment
              ? "You are planner for this department!"
              : "Not planner for this dept!"
          }`}
          <br />
        </Typography>
      </DialogContent>
      {(roles.admin === "1" || isPlannerForThisDepartment) && (
        <DialogActions>
          {numberOfPrograms === 0 ? (
            <DeleteDepartment
              singleDepartment={singleDepartment}
              getAllDepartments={getAllDepartments}
              setOpen={setOpen}
            />
          ) : (
            <Tooltip
              title={`Programs: ${namesOfPrograms.join(", ")}${
                numberOfPrograms > 5 ? ", ..." : ""
              }`}
              placement="top"
            >
              <div>
                <Button
                  variant="contained"
                  disabled
                  className="redButton disabledButton"
                >
                  {numberOfPrograms !== null
                    ? numberOfPrograms === 0
                      ? "There are no programs in this department."
                      : numberOfPrograms === 1
                        ? "This department has 1 program."
                        : `This department has  ${numberOfPrograms} programs.`
                    : "Loading..."}
                </Button>
              </div>
            </Tooltip>
          )}
          <EditDepartment
            singleDepartment={singleDepartment}
            setSingleDepartment={setSingleDepartment}
            getAllDepartments={getAllDepartments}
            setOpen={setOpen}
            open={open}
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
