import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ajaxRequestErrorHandler,
  getFunctionName,
} from "../ajax/ajaxRequestErrorHandler";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dao from "../ajax/dao";
import AlertBox from "../components/common/AlertBox";

export default function ResetPasswordView() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "error message",
    severity: "error",
    title: "Error",
  });
  const { id } = useParams();
  console.log("User ID from URL:", id);

  const handleReset = async () => {
    if (password !== rePassword) {
      setAlertOptions({
        severity: "info",
        title: "Info",
        message: "Passwords do not match. Please re-enter.",
      });
      setAlertOpen(true);
      return;
    }

    const response = await dao.resetPassword(id, password);
    if (response) {
      setAlertOptions({
        severity: "success",
        title: "Success",
        message: "Congratulations! Password updated successfully.",
      });
      setAlertOpen(true);
    } else {
      ajaxRequestErrorHandler(
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    }
  };

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Card variant="outlined">
        <CardContent>
          <Typography>Please enter your new password here.</Typography>
          <Grid>
            <TextField
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New Password"
            />
          </Grid>
          <Grid>
            <TextField
              value={rePassword}
              type="password"
              onChange={(event) => setRePassword(event.target.value)}
              placeholder="Type Password again"
            />
          </Grid>
          <Button onClick={handleReset}>Reset Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
