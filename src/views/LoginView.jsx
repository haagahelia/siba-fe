// The Log In page
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";
import Logger from "../logger/logger";
import { getSettings, handleSettings } from "../setting/handleSettings";
import backgroundImage from "../styles/SibeliusLogoLoginPage.svg";

export const localStorageClearUserLoginAndToken = () => {
  localStorage.setItem("sessionToken", "");
  localStorage.setItem("userId", "");
  localStorage.setItem("email", "");
  localStorage.setItem("isAdmin", "");
  localStorage.setItem("isPlanner", "");
  localStorage.setItem("isStatist", "");
};

export default function LoginView({ handleLoginChange }) {
  Logger.logPrefix = "LoginView";

  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(true);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  // one function used to serve both the functions login and error
  const loginAndError = async () => {
    try {
      await handleLogin(); // Wait for loginUser to complete
    } catch (error) {
      // Handle error from loginUser
    }

    setTimeout(() => {
      // errorShown();
    }, 500); // Add 1000ms delay before calling errorShown
  };

  const handleLogin = async () => {
    // Logger.debug("Attempting to log in");
    const { httpStatus, data } = await dao.loginUser(loginForm);
    if (httpStatus !== 200) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Username or Password is wrong",
      });
      setAlertOpen(true);
      Logger.error("Login failed:", data);
    } else {
      setErrorMsg("");
      setShowError(false);

      localStorage.setItem("sessionToken", data[0].token);
      appContext.sessionToken = data[0].token;

      localStorage.setItem("userId", data[0].id);
      appContext.userId = data[0].id;

      localStorage.setItem("email", data[0].email);
      appContext.userEmail = data[0].email;

      localStorage.setItem("isAdmin", data[0].isAdmin);
      appContext.roles.admin = data[0].isAdmin;

      localStorage.setItem("isPlanner", data[0].isPlanner);
      appContext.roles.planner = data[0].isPlanner;

      localStorage.setItem("isStatist", data[0].isStatist);
      appContext.roles.statist = data[0].isStatist;

      Logger.debug("Login successful", data);

      // Logger.debug("Login info in appContext", appContext);

      // Set alert description to describe the event
      setAlertOptions({
        severity: "success",
        title: "Welcome!",
        message: "Welcome to siba",
      });

      // Show popup
      setAlertOpen(true);

      handleLoginChange();
      handleSettings(getSettings(), appContext);

      setLoginForm({
        email: "",
        password: "",
      });

      // Timeout to show popup message before navigation
      setTimeout(() => {
        navigate("/subject");
      }, 1500);
    }
  };

  const handleReset = () => {
    navigate("/forget-password");
  };

  useEffect(() => {
    document.title = "Log In";
  }, []);

  return (
    <div className="sibeliusCursor">
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
        <CardContent variant="logInPageTransparencyFix">
          <Typography variant="logInPageTitle">Log In</Typography>
          <Grid>
            <TextField
              id="loginEmail"
              className="formTextInput"
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm({ ...loginForm, email: event.target.value })
              }
              placeholder="email"
            />
          </Grid>
          <Grid>
            <TextField
              id="loginPassword"
              className="formTextInput"
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
            <Button
              id="loginButton"
              variant="formButton"
              onClick={loginAndError}
            >
              Login
            </Button>
          </Grid>
          <Link style={{ cursor: "pointer" }} onClick={handleReset}>
            Forgot your password?
          </Link>
          {errorMsg}
        </CardContent>
      </Card>
    </div>
  );
}
