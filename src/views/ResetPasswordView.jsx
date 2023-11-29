import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function ResetPasswordView() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    const response = await fetch(
      `http://localhost:8764/api/user/reset-password/${id}/${token}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      },
    );

    if (response.status === 200) {
      navigate("/login");
      alert("Congratulations! Password updated successfully.");
    }
  };

  return (
    <div>
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
          <Button onClick={handleReset}>Reset Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
