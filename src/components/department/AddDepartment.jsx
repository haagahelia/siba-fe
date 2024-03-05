import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddDepartment";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function AddDepartment({ getAllDepartments }) {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is a title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const [department, setDepartment] = useState({
    name: "",
    description: "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: department,
    validateOnChange: true,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.name}?`,
        content: `By clicking continue, ${values.name} will be added to the department list`,
      });
      setDialogOpen(true);
    },
  });

  const addDepartment = async (submitValues) => {
    submitValues.name = capitalizeFirstLetter(submitValues.name);
    const success = await dao.addDepartment(submitValues);
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
    } else {
      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${submitValues.name} added successfully.`,
      });
      setDepartment(submitValues);
    }
    setAlertOpen(true);
    getAllDepartments();
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
        submit={addDepartment}
        submitValues={formik.values}
      />
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title="Add Department"
            onClick={() => setIsCardExpanded(!isCardExpanded)}
            variant="pageHeader"
            action={
              <IconButton
                onClick={() => setIsCardExpanded(!isCardExpanded)}
                aria-expanded={isCardExpanded}
                aria-label="show more"
              >
                {isCardExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
          />
          {isCardExpanded && (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    fullWidth
                    error={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    name="name"
                    placeholder="Name..."
                    label="Department name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : null
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <TextField
                    fullWidth
                    error={
                      formik.touched.description && formik.errors.description
                        ? true
                        : false
                    }
                    name="description"
                    label="Description"
                    placeholder="Some description..."
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    helperText={
                      formik.touched.description && formik.errors.description
                        ? formik.errors.description
                        : null
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="addComponentFormButton"
                    onClick={() => {
                      setDepartment(formik.values);
                    }}
                  >
                    Add Department
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
