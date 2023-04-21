import React from "react";
import { useState, useContext, useEffect } from "react";
import { TextField, Card, CardContent, Grid, Button } from "@mui/material";
import dao from "../ajax/dao";
import { AppContext } from "../AppContext";

export default function LoginView(props) {
  const { setLoggedIn } = props;
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const appContext = useContext(AppContext);

  const loginUser = async () => {
    const { success, data } = await dao.getUserByEmail(loginForm);
    if (!success) {
      console.log(data);
    } else {
      appContext.userEmail = data[0].email;
      localStorage.setItem("email", data[0].email);
      localStorage.setItem("sessionToken", data[0].token);
      localStorage.setItem("isAdmin", data[0].isAdmin);
      localStorage.setItem("isPlanner", data[0].isPlanner);
      localStorage.setItem("isStatist", data[0].isStatist);
      setLoggedIn(data[0].email);
      window.alert("Welcome!");
      setLoginForm({
        email: "",
        password: "",
      });
    }
  };

  const logOut = () => {
    localStorage.clear();
    setLoggedIn("");
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "65%",
          padding: 1,
          margin: "auto",
          marginTop: "20px",
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
          <Grid>
            <Button onClick={logOut}>Log out</Button>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
