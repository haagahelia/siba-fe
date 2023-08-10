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

  const appContext = useContext(AppContext);

  const loginUser = async () => {
    Logger.debug("Attempting to log in");
    const { success, data } = await dao.getUserByEmail(loginForm);
    if (!success) {
      Logger.error("Login failed:", data);
    } else {
      Logger.debug("Login successful");
      appContext.userEmail = data[0].email;
      localStorage.setItem("email", data[0].email);
      localStorage.setItem("sessionToken", data[0].token);
      localStorage.setItem("isAdmin", data[0].isAdmin);
      localStorage.setItem("isPlanner", data[0].isPlanner);
      localStorage.setItem("isStatist", data[0].isStatist);
      handleLoginChange();
      window.alert("Welcome!");
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
            <Button onClick={loginUser}>Login</Button>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
