import { useFormik } from "formik";
import { useEffect, useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import dao from "../../ajax/dao";
import ValidateAddUser from "../../validation/ValidateAddUser";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddUserForm from "./AddUserForm";

export default function AddUser({ getAllUsers }) {
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });

  const [initialUser, setInitialUser] = useState({
    email: "",
    password: "",
    isAdmin: 0,
    isPlanner: 0,
    isStatist: 0,
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialUser,
    validate: ValidateAddUser,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.email}?`,
        content: `By clicking continue, ${values.email} will be used to create a new user`,
      });
      setDialogOpen(true);

      return;
    },
  });

  const addUser = async (submitValues) => {
    const result = await dao.postNewUser(submitValues);

    if (!result) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
      return;
    } else {
      setDialogOpen(false);
      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${submitValues.email} added.`,
      });
      setAlertOpen(true);
      setInitialUser({
        email: "",
        password: "",
        isAdmin: 0,
        isPlanner: 0,
        isStatist: 0,
      });
      getAllUsers();
    }
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={addUser}
        submitValues={initialUser}
      />
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title="Add User"
            onClick={() => setIsCardExpanded(!isCardExpanded)}
            variant="pageHeader"
            action={
              <IconButton
                onClick={() => setIsCardExpanded(!isCardExpanded)}
                aria-expanded={isCardExpanded}
                aria-label="expand/collapse"
              >
                {isCardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          />
          {isCardExpanded && (
            <AddUserForm
              formik={formik}
              submitValues={formik.values}
              setInitialUser={setInitialUser}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
