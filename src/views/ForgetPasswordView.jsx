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
    try {
      const response = await dao.forgetPassword(email);

      if (response.httpStatus === 200) {
        const { id } = response.data[0];
        navigate(`/reset-password/${id}`);
      } else if (response.httpStatus === 400) {
        setAlertOptions({
          severity: "info",
          title: "Info",
          message: "Email not registered yet!",
        });
        setAlertOpen(true);
      } else {
        ajaxRequestErrorHandler(
          getFunctionName(2),
          setAlertOptions,
          setAlertOpen,
        );
      }
    } catch (error) {
      console.error("Error during password reset:", error);
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
            Please enter your registered email to reset your password. (not
            secure, just demo)
          </Typography>
          <Grid>
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
            />
          </Grid>
          <Button onClick={() => handleReset(email)}>Send</Button>
        </CardContent>
      </Card>
    </div>
  );
}
