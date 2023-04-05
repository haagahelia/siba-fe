import React, { useState } from "react";
import { CardHeader, Card, CardContent } from "@mui/material";
import AlertBox from "../common/AlertBox";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import {
  validate,
  capitalizeFirstLetter,
} from "../../validation/ValidateAddEditSetting";
import dao from "../../ajax/dao";
import AddSettingForm from "./AddSettingForm";

export default function AddSettingContainer(props) {
  const { getAllSettings } = props;
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
  const [initialSetting, setInitialSetting] = useState({
    name: "",
    description: "",
    numberValue: "",
    textValue: "",
  });

  const resetForm = () => {
    setInitialSetting({
      name: "",
      description: "",
      numberValue: "",
      textValue: "",
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialSetting,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.name}?`,
        content: `By clicking continue, ${values.name} will be added to the setting list`,
      });
      setDialogOpen(true);

      return;
    },
  });

  const addSetting = async (submitValues) => {
    let newSetting = {
      name: capitalizeFirstLetter(submitValues.name),
      description: submitValues.description,
      numberValue: submitValues.numberValue,
      textValue: submitValues.textValue,
    };

    let result = await dao.postNewSetting(newSetting);
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
    getAllSettings();
  };
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
        submit={addSetting}
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
          <CardHeader title="Add Setting" sx={{ marginBottom: "30px" }} />
          <AddSettingForm
            formik={formik}
            submitValues={formik.values}
            setInitialSetting={setInitialSetting}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
