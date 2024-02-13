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

  const openConfirmationDialog = () => {
    setDialogOptions({
      title: `Are you sure you want to add "${department.name}"?`,
      content: `Press continue to save "${department.name}".`,
    });
    setDialogOpen(true);
  };

  const inputChanged = (event) => {
    setDepartment({ ...department, [event.target.name]: event.target.value });
  };

  const addDepartment = async () => {
    const validationErrors = await validate(department);
    console.log("addSingleDepartment validate");
    console.dir(validationErrors);

    for (const element of Object.keys(validationErrors)) {
      console.log(`key:  ${element}`);
    }

    if (Object.keys(validationErrors).length > 0) {
      // department name already exists
      if (Object.keys(validationErrors).some((element) => element === "name")) {
        //console.log(validationErrors.name);
        console.log(`Error name:${validationErrors.name}`);
        setAlertOptions({
          title: "Error",
          message: `${validationErrors.name}`,
          severity: "error",
        });
        setAlertOpen(true);
        return;
      }
    }

    const success = await dao.addDepartment(department);

    if (!success) {
      setAlertOptions({
        title: "Error",
        message: "Something went wrong - please try again later.",
        severity: "error",
      });
      setAlertOpen(true);
    } else {
      setAlertOptions({
        title: "Success!",
        message: `${department.name} added successfully.`,
        severity: "success",
      });
      setAlertOpen(true);
      setDepartment({
        name: "",
        description: "",
      });
      getAllDepartments();
      setDialogOpen(false);
    }
  };

  return (
    <>
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
                  name="name"
                  value={department.name}
                  onChange={inputChanged}
                  label="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  value={department.description}
                  onChange={inputChanged}
                  label="Description"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => openConfirmationDialog()}
                  variant="addComponentFormButton"
                >
                  Add Department
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
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
        submitValues={department}
      />
    </>
  );
}
