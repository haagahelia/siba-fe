import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditDepartment";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddDepartmentDialogConfirmation from "./AddDepartmentDialogConfirmation"; // You will need to create this component

export default function AddDepartment({ getAllDepartments }) {
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState({
    name: "",
    description: "",
  });

  const openDialogBox = () => {
    setOpen(true);
  };

  const inputChanged = (event) => {
    setDepartment({ ...department, [event.target.name]: event.target.value });
  };

  // const addDepartment = async () => {
  //   const validation = validate(department);
  //   Logger.debug("Validation "+validation);
  //   console.dir(validation);

  //   if (validation) {
  //     if (Object.values(validation).length !== 0) {
  //       alert(Object.values(submitValues));
  //     }
  //     console.log("return");
  //     return;
  //   }

  //   const success = await dao.addDepartment(department);
  //   if (!success) {
  //     alert("something went wrong!");
  //   } else {
  //     setDepartment({ name: "", description: "" });
  //     getAllDepartments();
  //     setOpen(false);
  //   }
  // };

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
                  onClick={() => openDialogBox()}
                  variant="addComponentFormButton"
                >
                  Add Department
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
      <AddDepartmentDialogConfirmation
        open={open}
        setOpen={setOpen}
        department={department}
        getAllDepartments={getAllDepartments}
        setDepartment={setDepartment}
      />
    </>
  );
}
