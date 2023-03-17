import React, { useState } from "react";
import { CardHeader, Card, CardContent } from "@mui/material";
import AlertBox from "../common/AlertBox";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import {
  validate,
  capitalizeFirstLetter,
} from "../../validation/ValidateAddEditBuilding";
import dao from "../../ajax/dao";
import AddBuildingForm from "./AddBuildingForm";

export default function AddBuildingContainer(props) {
  const { getAllBuildings } = props;
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
  // Here the initialvalues ​​of the form are stored in the state
  const [initialBuilding, setInitialBuilding] = useState({
    name: "",
    description: "",
  });

  const resetForm = () => {
    setInitialBuilding({
      name: "",
      description: "",
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialBuilding,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.name}?`,
        content: `By clicking continue, ${values.name} will be added to the building list`,
      });
      setDialogOpen(true);

      return;
    },
  });

  const addBuilding = async (submitValues) => {
    let newBuilding = {
      name: capitalizeFirstLetter(submitValues.name),
      description: submitValues.description,
    };

    let result = await dao.postNewBuilding(newBuilding);
    if (!result) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
      return;
    }
    setAlertOptions({
      severity: "success",
      title: "Success!",
      message: `${submitValues.name} added.`,
    });
    setAlertOpen(true);
    resetForm();
    getAllBuildings();
  };
  // Here is a list of lessons
  // When you choose a lesson, the information goes to the form's initialvalues
  // const handleChange = (e) => {
  //   let selected = e.target.value;
  //   setInitialBuilding({
  //     name: formik.values.name, // This is so that the entered name does not change even if you select the data of an existing lesson
  //     description: selected.groupSize,
  //   });
  // };
  return (
    <React.Fragment>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={addBuilding}
        submitValues={formik.values}
      />
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
          <CardHeader title="Add Building" sx={{ marginBottom: "30px" }} />
          <AddBuildingForm
            // handleChange={handleChange}
            formik={formik}
            submitValues={formik.values}
            setInitialBuilding={setInitialBuilding}
            // allBuildingsList={allBuildingsList}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
