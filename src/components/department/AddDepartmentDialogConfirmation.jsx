import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddDepartment";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function AddDepartmentDialogConfirmation({
  open,
  setOpen,
  department,
  setDepartment,
  getAllDepartments,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is a title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });

  const addSingleDepartment = async () => {
    const validationErrors = await validate(department);
    Logger.debug("addSingleDepartment validate");
    console.dir(validationErrors);

    for (const element of Object.keys(validationErrors)) {
      Logger.debug(`key:  ${element}`);
    }

    if (Object.keys(validationErrors).length > 0) {
      // department name already exists
      if (Object.keys(validationErrors).some((element) => element === "name")) {
        //alert(validationErrors.name);
        setAlertOptions({
          title: "Error",
          message: `${department.name} already exists.`,
          severity: "error",
        });
        setAlertOpen(true);
        Logger.debug("Return1");
        return;
      }
      // other error ?
      alert(validationErrors);
      Logger.debug("Return2");
      return;
    }

    const success = await dao.addDepartment(department);

    if (!success) {
      //alert("Something went wrong!");
      setAlertOptions({
        title: "Error",
        message: "Something went wrong - please try again later.",
        severity: "error",
      });
      setAlertOpen(true);
    } else {
      setAlertOptions({
        title: "Success!",
        message: `${department.name} added successfully.`,
        severity: "success",
      });
      setAlertOpen(true);
      setDepartment({
        name: "",
        description: "",
      });
      getAllDepartments();
      setOpen(false);
    }
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={addSingleDepartment}
        submitValues={department}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Are you sure you want to add {department?.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            By clicking continue, {department?.name} will be added to
            departments.
          </DialogContentText>
          <Button
            variant="contained"
            className="redButton"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              Logger.debug("parola italiana");
              setOpen(false);
              setDialogOptions({
                title: `Are you sure you want to add ${department.name}?`,
                content: `Press continue to save ${department.name}.`,
              });
              setDialogOpen(true);
            }}
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
