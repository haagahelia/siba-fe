import Button from "@mui/material/Button";
import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
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
      isAdmin: user.admin ? user.admin : 0,
      isPlanner: user.planner ? user.planner : 0,
      isStatist: user.statist ? user.statist : 0,
      department: user.department ? user.department : "",
    };
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
