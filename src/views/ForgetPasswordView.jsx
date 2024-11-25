import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function ForgetPasswordView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "error message",
    severity: "error",
    title: "Error",
  });

  const handleReset = async () => {
    const response = await dao.forgotPassword(email);

    if (response.ok) {
      const data = await response.json();
      const { id, token } = data;
      navigate(`/reset-password/${id}/${token}`);
    } else if (response.status === 400) {
      setAlertOptions({
        severity: "info",
        title: "Info",
        message: "Email not registered yet!",
      });
      setAlertOpen(true);
    } else {
      ajaxRequestErrorHandler(
        httpStatus,
        getFunctionName(2),
        setAlertOptions,
        setAlertOpen,
      );
    }
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Card variant="outlined">
        <CardContent>
          <Typography>
            Please enter your registered email to reset your password.  (not secure, just demo)
          </Typography>
          <Grid>
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
            />
          </Grid>
          <Button onClick={handleReset}>Send</Button>
        </CardContent>
      </Card>
    </div>
  );
}
