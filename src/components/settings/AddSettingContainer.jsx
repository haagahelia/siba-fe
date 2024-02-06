import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditSetting";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddSettingForm from "./AddSettingForm";

export default function AddSettingContainer({ getAllSettings }) {
  // State for checking if Add Setting card is expanded
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
  // Here the initialvalues of the form are stored in the state
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
    const newSetting = {
      name: capitalizeFirstLetter(submitValues.name),
      description: submitValues.description,
      numberValue: submitValues.numberValue,
      textValue: submitValues.textValue,
    };

    const result = await dao.postNewSetting(newSetting);
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
        submit={addSetting}
        submitValues={formik.values}
      />
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title="Add Setting"
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
            <AddSettingForm
              formik={formik}
              submitValues={formik.values}
              setInitialSetting={setInitialSetting}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
