import { useFormik } from "formik";
import { useEffect, useState } from "react";

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
import dao from "../../ajax/dao";
import ValidateAddUser from "../../validation/ValidateAddUser";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function AddUser({ getAllUsers }) {
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });

  const [initialUser, setInitialUser] = useState({
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

  const handleCheckUserRole = (rolename) => (event) => {
    const updatedValue = event.target.checked ? 1 : 0;
    formik.setFieldValue(rolename, updatedValue);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialUser,
    validate: ValidateAddUser,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.email}?`,
        content: `By clicking continue, ${values.email} will be used to create a new user`,
      });
      setDialogOpen(true);

      return;
    },
  });

  const addUser = async (submitValues) => {
    const result = await dao.postNewUser(submitValues);

    if (!result) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
      return;
    } else {
      setDialogOpen(false);
      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${submitValues.email} added.`,
      });
      setAlertOpen(true);
      setInitialUser({
        email: "",
        password: "",
        isAdmin: 0,
        isPlanner: 0,
        isStatist: 0,
      });
      getAllUsers();
    }
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={addUser}
        submitValues={initialUser}
      />
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
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className="formTextInput"
                    error={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    name="email"
                    placeholder="Email..."
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    placeholder="Password..."
                    label="Password"
                    className="formTextInput"
                    error={
                      formik.touched.password && !formik.values.password
                        ? true
                        : false
                    }
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    type={showPassword ? "text" : "password"}
                    helperText={
                      formik.touched.password && !formik.values.password
                        ? "Password is a required field"
                        : null
                    }
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
                      checked={formik.values.isAdmin === 1}
                      onChange={handleCheckUserRole("isAdmin")}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Planner"
                      labelPlacement="start"
                      className="formCheckBoxButtons"
                      name="isPlanner"
                      checked={formik.values.isPlanner === 1}
                      onChange={handleCheckUserRole("isPlanner")}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Statist"
                      labelPlacement="start"
                      className="formCheckBoxButtons"
                      name="isStatist"
                      checked={formik.values.isStatist === 1}
                      onChange={handleCheckUserRole("isStatist")}
                    />
                  </FormGroup>
                  <Button
                    type="submit"
                    variant="addComponentFormButton"
                    onClick={() => {
                      setInitialUser(formik.values);
                    }}
                  >
                    Add User
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
}
