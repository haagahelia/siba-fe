import { useEffect } from "react";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
      {roles.admin === "1" && (
        <DialogActions>
          <EditDepartment
            singleDepartment={singleDepartment}
            setSingleDepartment={setSingleDepartment}
            getAllDepartments={getAllDepartments}
            open={open}
            setOpen={setOpen}
          />
          <DeleteDepartment
            singleDepartment={singleDepartment}
            getAllDepartments={getAllDepartments}
            setOpen={setOpen}
          />
        </DialogActions>
      )}
      <DialogContent>id: {singleDepartment?.id}</DialogContent>
      <DialogContent>Name: {singleDepartment?.name}</DialogContent>
      <DialogContent>
        Description: {singleDepartment?.description}
      </DialogContent>
    </Dialog>
  );
}
