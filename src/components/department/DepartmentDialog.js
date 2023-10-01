import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteDepartment from "./DeleteDeparment";
import EditDepartment from "./EditDepartment";

export default function DepartmentDialog({
  open,
  setOpen,
  singleDepartment,
  getAllDepartments,
}) {
  const { roles } = RoleLoggedIn();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="dialog-title">Department Info</DialogTitle>
      <DialogContent>id: {singleDepartment?.id}</DialogContent>
      <DialogContent>Name: {singleDepartment?.name}</DialogContent>
      <DialogContent>
        Description: {singleDepartment?.description}
      </DialogContent>
      {roles.admin === "1" && (
        <DialogContent variant="sibaDialogContent">
          <DeleteDepartment
            setOpen={setOpen}
            getAllDepartments={getAllDepartments}
            singleDepartment={singleDepartment}
          />
          <EditDepartment
            getAllDepartments={getAllDepartments}
            singleDepartment={singleDepartment}
            setOpen={setOpen}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}
