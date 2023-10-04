import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleReset = async () => {
    const response = await fetch(
      "http://localhost:8764/api/user/forget-password",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      const { id, token } = data;
      navigate(`/reset-password/${id}/${token}`);
    } else {
      alert("Email not registered yet!");
    }
  };

  return (
    <div>
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
          <Typography>
            Please enter your registered email to reset your password.
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
