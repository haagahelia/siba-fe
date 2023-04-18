import { TextField, Card, CardContent, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import bcrypt from "bcryptjs";

export default function AddUser() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    isAdmin: "",
    isPlanner: "",
    isStatist: "",
  });

  const registerUser = async () => {
    const hashedPassword = bcrypt.hashSync(registerForm.password, 10);
    let success = await dao.postNewUser({
      ...registerForm,
      password: hashedPassword,
    });
    if (!success) {
      alert("Something went wrong");
    } else {
      setRegisterForm({
        email: "",
        password: "",
        isAdmin: "",
        email: "",
        isPlanner: "",
        isStatist: "",
      });
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
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Grid>
            <TextField
              value={registerForm.email}
              onChange={(event) =>
                setRegisterForm({ ...registerForm, email: event.target.value })
              }
              placeholder="email"
            />
          </Grid>
          <Grid>
            <TextField
              value={registerForm.password}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  password: event.target.value,
                })
              }
              placeholder="password"
            />
          </Grid>
          <Grid>
            <TextField
              value={registerForm.isAdmin}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  isAdmin: event.target.value,
                })
              }
              placeholder="isAdmin"
            />
          </Grid>
          <Grid>
            <TextField
              value={registerForm.isPlanner}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  isPlanner: event.target.value,
                })
              }
              placeholder="isPlanner"
            />
          </Grid>
          <Grid>
            <TextField
              value={registerForm.isStatist}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  isStatist: event.target.value,
                })
              }
              placeholder="isStatist"
            />
          </Grid>
          <Grid>
            <Button onClick={registerUser}>Register</Button>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
