import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import AlertBox from "../components/common/AlertBox";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function ForgetPassword() {

  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); 
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(true);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });

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
          width: "65%",
          padding: 1,
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <CardContent>
        <Typography>Please enter your registered email to receive the password reset link.</Typography>
          <Grid>
            <TextField
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="email"
            />
          </Grid>
          <Button onClick={() => alert(`Work in progress!`)}>Send</Button>
        </CardContent>
      </Card>
    </div>
  );
}
