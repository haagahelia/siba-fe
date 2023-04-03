import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import DeleteDepartment from "./DeleteDeparment";

export default function DepartmentDialog(props) {
  const {
    open,
    setOpen,
    singleDepartment,
    setSingleDepartment,
    getAllDepartments,
    openDelete,
    setOpenDelete,
  } = props;

  return (
    <>
      <Dialog open={props.open} onClose={() => setOpen(false)}>
        <DialogTitle id="dialog-title">Department Info</DialogTitle>
        <DialogContent>id: {singleDepartment?.id}</DialogContent>
        <DialogContent>Name: {singleDepartment?.name}</DialogContent>
        <DialogContent>
          Description: {singleDepartment?.description}
        </DialogContent>
        <DialogContent>
          <DeleteDepartment
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            getAllDepartments={getAllDepartments}
            singleDepartment={singleDepartment}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
