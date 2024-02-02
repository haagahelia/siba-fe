import { useEffect, useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import dao from "../../ajax/dao";
import ValidateAddUser from "../../validation/ValidateAddUser";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

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

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    isAdmin: 0,
    isPlanner: 0,
    isStatist: 0,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const addUser = async (submitValues) => {
    const validationErrors = await ValidateAddUser(submitValues);
    if (validationErrors.general) {
      alert(
        "Email and/or password is missing, and/or select at least one role.",
      );
      return;
    }

    if (validationErrors.email) {
      alert(`The email address ${submitValues.email} already exists.`);
      return;
    }

    const success = await dao.postNewUser(submitValues);

    if (!success) {
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
      setRegisterForm({
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
        submitValues={registerForm}
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
                color="primary"
              >
                {isCardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          />
          {isCardExpanded && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className="formTextInput"
                  value={registerForm.email}
                  onChange={(event) =>
                    setRegisterForm({
                      ...registerForm,
                      email: event.target.value,
                    })
                  }
                  placeholder="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="formTextInput"
                  value={registerForm.password}
                  onChange={(event) =>
                    setRegisterForm({
                      ...registerForm,
                      password: event.target.value,
                    })
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePasswordVisibility}
                          edge="end"
                          style={{ backgroundColor: "transparent" }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Admin"
                    labelPlacement="start"
                    className="formCheckBoxButtons"
                    name="isAdmin"
                    checked={registerForm.isAdmin === 1}
                    onChange={(event) =>
                      setRegisterForm({
                        ...registerForm,
                        isAdmin: event.target.checked ? 1 : 0,
                      })
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Planner"
                    labelPlacement="start"
                    className="formCheckBoxButtons"
                    name="isPlanner"
                    checked={registerForm.isPlanner === 1}
                    onChange={(event) =>
                      setRegisterForm({
                        ...registerForm,
                        isPlanner: event.target.checked ? 1 : 0,
                      })
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Statist"
                    labelPlacement="start"
                    className="formCheckBoxButtons"
                    name="isStatist"
                    checked={registerForm.isStatist === 1}
                    onChange={(event) =>
                      setRegisterForm({
                        ...registerForm,
                        isStatist: event.target.checked ? 1 : 0,
                      })
                    }
                  />
                </FormGroup>
                <Button
                  type="submit"
                  variant="addComponentFormButton"
                  onClick={() => {
                    setDialogOptions({
                      title: `Are you sure you want to add ${registerForm.email}?`,
                      content: `By clicking continue, ${registerForm.email} will be used to create a new user`,
                    });
                    setDialogOpen(true);
                  }}
                >
                  Add User
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
}
