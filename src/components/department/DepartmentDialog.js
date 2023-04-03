import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import DeleteDepartment from "./DeleteDeparment";
import EditDepartment from "./EditDepartment";

export default function DepartmentDialog(props) {
  const {
    open,
    setOpen,
    singleDepartment,
    setSingleDepartment,
    getAllDepartments,
  } = props;

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="dialog-title">Department Info</DialogTitle>
        <DialogContent>id: {singleDepartment?.id}</DialogContent>
        <DialogContent>Name: {singleDepartment?.name}</DialogContent>
        <DialogContent>
          Description: {singleDepartment?.description}
        </DialogContent>
        <DialogContent
          sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}
        >
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
      </Dialog>
    </>
  );
}
