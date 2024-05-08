import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import dao from "../../ajax/dao";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";
import { validate } from "../../validation/ValidateEditProgram";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function EditProgram({
  singleProgram,
  setSingleProgram,
  getAllPrograms,
  setOpen,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [departmentSelectList, setDepartmentSelectList] = useState([]);

  const { roles } = useRoleLoggedIn();
  const { userId } = useContext(AppContext);

  const getDepartmentForSelect = async () => {
    try {
      if (roles.admin === "1") {
        Logger.debug(
          "Fetching all Departments for select from server (Admin).",
        );
        const { httpStatus, data } = await dao.fetchDepartmentForSelect();
        if (httpStatus !== 200) {
          ajaxRequestErrorHandler(
            httpStatus,
            getFunctionName(2),
            setAlertOptions,
            setAlertOpen,
          );
        } else {
          setDepartmentSelectList(data);
        }
      } else if (roles.planner === "1") {
        Logger.debug("Fetching planner-specific Departments from server.");
        const response = await dao.fetchDepartmentplannerByUserId(userId);
        if (response.success) {
          setDepartmentSelectList(response.data);
        } else {
          Logger.error("Error fetching planner Departments.");
        }
      }
    } catch (error) {
      Logger.error("Error in getDepartmentForSelect:", error);
    }
  };

  useEffect(() => {
    getDepartmentForSelect();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: singleProgram,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to edit ${values.name}?`,
        content: `Press continue to save ${values.name} new information. `,
      });
      setDialogOpen(true);
      return;
    },
  });

  async function submitEditedProgram(values) {
    Logger.debug(
      `Submitting edits for program: ${JSON.stringify(singleProgram)}`,
    );
    const editedProgram = {
      id: values.id,
      name: values.name,
      departmentId: values.departmentId,
    };
    const result = await dao.editProgram(editedProgram);
    if (!result) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
      return;
    }
    setAlertOptions({
      severity: "success",
      title: "Success!",
      message: `${values.name} updated successfully.`,
    });
    setEditOpen(false);
    setAlertOpen(true);
    values.departmentName = departmentSelectList.find(
      (item) => item.id === values.departmentId,
    ).name;
    setSingleProgram(formik.values);
    getAllPrograms();
  }

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={submitEditedProgram}
        submitValues={formik.values}
      />
      <Button
        variant="contained"
        className="editButton"
        onClick={() => {
          setEditOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Edit: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <Grid container variant="sibaGridEdit" spacing={2} column={7}>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  name="Program"
                  label="Program"
                  defaultValue={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : null
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 230 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="departmentId"
                    label="Department"
                    onChange={formik.handleChange}
                    value={formik.values.departmentId || ""}
                    onBlur={formik.handleBlur}
                  >
                    {departmentSelectList.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-evenly" }}>
            <Button
              onClick={() => {
                setOpen(false);
                formik.resetForm();
              }}
              variant="contained"
              className="redButton"
            >
              Cancel
            </Button>
            <Tooltip
              title={
                formik.dirty ? "" : "Please change values to enable submit"
              }
              placement="top"
            >
              <span>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!formik.dirty}
                >
                  Submit
                </Button>
              </span>
            </Tooltip>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
