import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AddUserForm({ formik, submitValues, setInitialUser }) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckUserRole = (rolename) => (event) => {
    const updatedValue = event.target.checked ? 1 : 0;
    formik.setFieldValue(rolename, updatedValue);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className="formTextInput"
            error={formik.touched.email && formik.errors.email ? true : false}
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
            git
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="formTextInput"
            error={
              formik.touched.password && formik.values.password ? true : false
            }
            name="password"
            placeholder="Password..."
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            type={showPassword ? "text" : "password"}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
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
          <div className="errorMessage">
            {(formik.touched.isAdmin ||
              formik.touched.isPlanner ||
              formik.touched.isStatist) &&
            Boolean(formik.errors.roles) === true
              ? formik.errors.roles
              : null}
          </div>
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
              setInitialUser(submitValues);
            }}
          >
            Add User
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
