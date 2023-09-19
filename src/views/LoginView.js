import React from "react";
import { useState, useContext } from "react";
import { TextField, Card, CardContent, Grid, Button } from "@mui/material";
import dao from "../ajax/dao";
import { AppContext } from "../AppContext";
import Logger from "../logger/logger";
import { useNavigate } from "react-router-dom";

export default function LoginView(props) {
  Logger.logPrefix = "LoginView";
  const navigate = useNavigate();
  const { handleLoginChange } = props;
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(true);

  const errorShown = () => {
    if (showError === true) {
      setErrorMsg("Username or Password is wrong");
    }
    if (showError === false) {
      setErrorMsg("");
    }
  };

  const loginAndError = async () => {
    try {
      await loginUser(); // Wait for loginUser to complete
    } catch (error) {
      // Handle the error from loginUser if needed
    }

    setTimeout(() => {
      errorShown();
    }, 500); // Add a 1000ms (1 second) delay before calling errorShown
  };

  const appContext = useContext(AppContext);

  const loginUser = async () => {
    //Logger.debug("Attempting to log in");
    const { httpStatus, data } = await dao.getUserByEmail(loginForm);
    if (httpStatus !== 200) {
      Logger.error("Login failed:", data);
    } else {
      setErrorMsg("");
      setShowError(false);

      localStorage.setItem("sessionToken", data[0].token);
      appContext.sessionToken = data[0].token;

      localStorage.setItem("email", data[0].email);
      appContext.userEmail = data[0].email;

      localStorage.setItem("isAdmin", data[0].isAdmin);
      appContext.roles.admin = data[0].isAdmin;

      localStorage.setItem("isPlanner", data[0].isPlanner);
      appContext.roles.planner = data[0].isPlanner;

      localStorage.setItem("isStatist", data[0].isStatist);
      appContext.roles.statist = data[0].isStatist;

      Logger.debug("Login successful", data);

      //Logger.debug("Login info in appContext", appContext);

      window.alert("Welcome!");

      handleLoginChange();

      setLoginForm({
        email: "",
        password: "",
      });

      navigate("/");
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "65%",
          padding: 1,
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <CardContent>
          <Grid>
            <TextField
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm({ ...loginForm, email: event.target.value })
              }
              placeholder="email"
            />
          </Grid>
          <Grid>
            <TextField
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm({
                  ...loginForm,
                  password: event.target.value,
                })
              }
              placeholder="password"
              type="password"
            />
          </Grid>
          <Grid>
            <Button onClick={loginAndError}>Login</Button>
          </Grid>
          {errorMsg}
        </CardContent>
      </Card>
    </>
  );
}
