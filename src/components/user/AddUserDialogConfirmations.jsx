import dao from "../../ajax/dao";
import ValidateAddUser  from "../../validation/ValidateAddUser";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function AddUserDialogConfirmations({
open,
setOpen,
registerForm,
setRegisterForm,
getAllUsers
}) {
    const addSingleUser = async () => {
     
        const validationErrors = await ValidateAddUser(registerForm);
        if (validationErrors.general) {
          alert("Email and/or password is missing, and/or select at least one role.");
          return;
        }
      
        if (validationErrors.email) {
          alert(`The email address ${registerForm.email} already exists.`);
          return;
        }
  
        const success = await dao.postNewUser(registerForm);
  
        if (!success) {
          console.error("Registration failed for email:", registerForm.email);
          alert("Something went wrong during registration!");
        } else {
          alert(`A user ${registerForm.email} was successfully created.`)
          setRegisterForm({
            email: "",
            password: "",
            isAdmin: 0,
            isPlanner: 0,
            isStatist: 0,
          });
          getAllUsers();
          setOpen(false);
        }
      
    };

    return(
        <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure you want to add {registerForm?.email} ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By clicking continue, {registerForm?.email} will be added to users.
          </DialogContentText>
        </DialogContent>
        <Button variant="contained" color="red" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={addSingleUser}
        >
          Continue
        </Button>
      </Dialog>
    );
}