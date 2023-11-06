import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography"; // Add Typography component
import { useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import AlertBox from "../common/AlertBox";

// Import the background image from the Login page
import backgroundImage from "../../styles/SibeliusLogoLoginPage.svg";

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
    isAdmin: "",
    isPlanner: "",
    isStatist: "",
  });

  const registerUser = async () => {
    Logger.debug(
      "Attempting to register a user with email:",
      registerForm.email,
    );
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
        isAdmin: "",
        isPlanner: "",
        isStatist: "",
      });

      // Trigger login change after registration
      handleLoginChange();
    }
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />

      {/* Use the same background image as the Login page */}
      <img
        src={backgroundImage}
        alt="Sibelius-Akatemia logo in the background."
        className="logInPageBackgroundLogo"
      />

      <Card variant="formContent">
        <CardContent style={{ zIndex: 1 }}>
          <Typography variant="logInPageTitle">Register</Typography>
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
            <TextField
              className="formTextInput"
              value={registerForm.isAdmin}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  isAdmin: event.target.value,
                })
              }
              placeholder="isAdmin"
            />
          </Grid>
          <Grid>
            <TextField
              className="formTextInput"
              value={registerForm.isPlanner}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  isPlanner: event.target.value,
                })
              }
              placeholder="isPlanner"
            />
          </Grid>
          <Grid>
            <TextField
              className="formTextInput"
              value={registerForm.isStatist}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  isStatist: event.target.value,
                })
              }
              placeholder="isStatist"
            />
          </Grid>
          <Grid>
            <Button variant="formButton" onClick={registerUser}>
              Register
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
