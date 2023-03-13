import { Dialog, DialogContent, DialogTitle } from "@mui/material";

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
      <Dialog open={props.open} onClose={() => setOpen(false)}>
        <DialogTitle id="dialog-title">Department Info</DialogTitle>
        <DialogContent>id: {singleDepartment?.id}</DialogContent>
        <DialogContent>Name: {singleDepartment?.name}</DialogContent>
        <DialogContent>
          Description: {singleDepartment?.description}
        </DialogContent>
      </Dialog>
    </>
  );
}
