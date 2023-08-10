import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import DeleteDepartment from "./DeleteDeparment";
import EditDepartment from "./EditDepartment";
import { RoleLoggedIn } from "../../customhooks/RoleLoggedIn";

export default function DepartmentDialog(props) {
  const { open, setOpen, singleDepartment, getAllDepartments } = props;
  const { roles } = RoleLoggedIn();

  return (
    <>
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
    </>
  );
}
