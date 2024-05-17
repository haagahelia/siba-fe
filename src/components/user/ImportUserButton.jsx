import Button from "@mui/material/Button";
import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import ValidateAddUser from "../../validation/ValidateAddUser";
import AlertBox from "../common/AlertBox";

export default function ImportUserButton({
  userToImport,
  userFailedToImport,
  setUserFailedToImport,
  getAllUsers,
  fileOptions,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert - check it out!",
    severity: "error",
  });

  const processUser = async (user, userSet) => {
    const newUser = {
      email: user.email ? user.email : "",
      password: user.password ? user.password : "",
      isAdmin: user.isAdmin ? user.isAdmin : 0,
      isPlanner: user.isPlanner ? user.isPlanner : 0,
      isStatist: user.isStatist ? user.isStatist : 0,
      departmentNames: user.departmentNames ? user.departmentNames : "",
    };

    const validateResult = await ValidateAddUser(newUser);

    user.FailedReason =
      validateResult.email ||
      validateResult.isAdmin ||
      validateResult.isPlanner ||
      validateResult.isStatist ||
      validateResult.password ||
      validateResult.departmentNames;

    if (user.FailedReason) {
      return user.FailedReason ? user : newUser;
    }

    userSet.add(newUser.email);
    return newUser;
  };

  //------
  const handleClick = async () => {
    await importData(
      userToImport,
      userFailedToImport,
      setUserFailedToImport,
      getAllUsers,
      processUser,
      dao.addNewUsers,
      setAlertOpen,
      setAlertOptions,
      fileOptions,
    );
  };
  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Import Data
      </Button>
    </>
  );
}
