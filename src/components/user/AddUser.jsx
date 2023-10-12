// The Register Page
// import bcrypt from "bcryptjs";
import { useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AlertBox from "../common/AlertBox";

export default function AddUser() {
  Logger.logPrefix = "AddUser";

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
    }
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />

      <Card
        variant="outlined"
        sx={{
          maxWidth: "100%",
          padding: 1,
          margin: "auto",
          marginTop: "85px",
        }}
      >
        <CardContent>
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
