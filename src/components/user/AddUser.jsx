// The "Register page"
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import backgroundImage from "../../styles/SibeliusLogoLoginPage.svg";
import AlertBox from "../common/AlertBox";

export default function RegisterView({ handleLoginChange }) {
  Logger.logPrefix = "RegisterView";

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an alert — check it out!",
    severity: "error",
  });

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    isAdmin: 0,
    isPlanner: 0,
    isStatist: 0,
  });

  const registerUser = async () => {
    Logger.debug(
      "Attempting to register a user with email:",
      registerForm.email,
    );

    if (
      registerForm.isAdmin === 0 &&
      registerForm.isPlanner === 0 &&
      registerForm.isStatist === 0
    ) {
      setAlertOptions({
        severity: "error",
        title: "Error!",
        message: "Please select at least one role.",
      });
      setAlertOpen(true);
      return;
    }

    // const hashedPassword = bcrypt.hashSync(registerForm.password, 10);
    const success = await dao.postNewUser({
      ...registerForm,
    });
    // password: hashedPassword,
    if (!success) {
      Logger.error("Registration failed for email:", registerForm.email);
      alert("Something went wrong");
    } else {
      Logger.debug("Registration successful for email:", registerForm.email);

      // Set the alert options for success
      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `A user ${registerForm.email} was successfully created.`,
      });
      setAlertOpen(true); // Open the alert

      setRegisterForm({
        email: "",
        password: "",
        isAdmin: 0,
        isPlanner: 0,
        isStatist: 0,
      });

      // Trigger login change after registration
      handleLoginChange();
    }
  };

  useEffect(() => {
    document.title = 'Add User';
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <img
        src={backgroundImage}
        alt="Sibelius-Akatemia logo in the background."
        className="logInPageBackgroundLogo"
      />

      <Card variant="formContent">
        <CardContent style={{ zIndex: 1 }}>
          <Typography variant="logInPageTitle">Add User</Typography>
          <Grid>
            <TextField
              className="formTextInput"
              value={registerForm.email}
              onChange={(event) =>
                setRegisterForm({ ...registerForm, email: event.target.value })
              }
              placeholder="email"
            />
          </Grid>
          <Grid>
            <TextField
              className="formTextInput"
              value={registerForm.password}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  password: event.target.value,
                })
              }
              placeholder="password"
            />
          </Grid>
          <Grid>
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
            <Button variant="formButton" onClick={registerUser}>
              Add User
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
