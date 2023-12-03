import { useState, useEffect } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AddUserDialogConfirmations from "./AddUserDialogConfirmations";

export default function AddUser({ getAllUsers }) {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  
  const [open, setOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    isAdmin: 0,
    isPlanner: 0,
    isStatist: 0,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openDialogBox = () => {
    setOpen(true);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <CardHeader
              title="Add User"
              onClick={() => setIsCardExpanded(!isCardExpanded)}
              variant="pageHeader"
              action={
                <IconButton
                  onClick={() => setIsCardExpanded(!isCardExpanded)}
                  aria-expanded={isCardExpanded}
                  aria-label="expand/collapse"
                  color="primary"
                >
                  {isCardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              }
            />
            {isCardExpanded && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className="formTextInput"
                    value={registerForm.email}
                    onChange={(event) =>
                      setRegisterForm({ ...registerForm, email: event.target.value })
                    }
                    placeholder="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="formTextInput"
                    value={registerForm.password}
                    onChange={(event) =>
                      setRegisterForm({
                        ...registerForm,
                        password: event.target.value,
                      })
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handlePasswordVisibility}
                            edge="end"
                            style={{ backgroundColor: "transparent" }}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Admin"
                      labelPlacement="start"
                      className="formCheckBoxButtons"
                      name="isAdmin"
                      checked={registerForm.isAdmin === 1}
                      onChange={(event) =>
                        setRegisterForm({
                          ...registerForm,
                          isAdmin: event.target.checked ? 1 : 0,
                        })
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Planner"
                      labelPlacement="start"
                      className="formCheckBoxButtons"
                      name="isPlanner"
                      checked={registerForm.isPlanner === 1}
                      onChange={(event) =>
                        setRegisterForm({
                          ...registerForm,
                          isPlanner: event.target.checked ? 1 : 0,
                        })
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Statist"
                      labelPlacement="start"
                      className="formCheckBoxButtons"
                      name="isStatist"
                      checked={registerForm.isStatist === 1}
                      onChange={(event) =>
                        setRegisterForm({
                          ...registerForm,
                          isStatist: event.target.checked ? 1 : 0,
                        })
                      }
                    />
                  </FormGroup>
                  <Button onClick={() => openDialogBox()} variant="contained">
                    Add User
                  </Button>
                </Grid>
              </Grid>
            )}
        </CardContent>
      </Card>
      <AddUserDialogConfirmations
        open={open}
        setOpen={setOpen}
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        getAllUsers={getAllUsers}
      />  
    </>
  );
}
