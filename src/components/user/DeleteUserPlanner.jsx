import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteUserPlanner({
  singleDepartmentByUserId,
  getDeparmentsByUserId,
  getAllUsers,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const [deleteUserPlanner, setDeleteUserPlanner] = useState({
    userId: 0,
    departmentId: 0,
  });

  const departmentName = singleDepartmentByUserId.name;

  const deleteUserDepartmentPlanner = async () => {
    const departmentId = singleDepartmentByUserId.id;
    const userId = singleDepartmentByUserId.userId;
    const result = await dao.deleteSingleDepartmentPlanner(
      userId,
      departmentId,
    );
    if (result === false) {
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
      message: `${departmentName} removed.`,
    });
    setAlertOpen(true);

    getDeparmentsByUserId(userId);
    getAllUsers();
  };

  const submitDelete = (values) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${values.name}?`,
      content: `Press continue to delete ${values.name} from the listing.`,
    });
    setDialogOpen(true);
    return;
  };

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
        submit={deleteUserDepartmentPlanner}
        submitValues={deleteUserPlanner}
      />
      <Button
        variant="contained"
        color="error"
        sx={{ maxWidth: "85px" }}
        onClick={() => {
          submitDelete(singleDepartmentByUserId);
        }}
      >
        Delete
      </Button>
    </div>
  );
}
