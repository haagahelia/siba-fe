import { useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography"; // Add Typography component
import AlertBox from "../common/AlertBox";

// Import the background image from the Login page
import loginBackgroundImage from "../../styles/SibeliusLogoLoginPage.svg";

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
        src={loginBackgroundImage}
        alt="Sibelius-Akatemia logo in the background."
        style={{
          height: "95%",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
        }}
      />

      <Card
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          margin: "auto",
          width: "100%",
        }}
      >
        <CardContent
          style={{
            zIndex: 1,
          }}
        >
          <Typography variant="h4">Register</Typography>
          <Grid>
            <TextField
              value={registerForm.email}
              onChange={(event) =>
                setRegisterForm({ ...registerForm, email: event.target.value })
              }
              placeholder="email"
            />
          </Grid>
          <Grid>
            <TextField
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
            <Button onClick={registerUser}>Register</Button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
