import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddEditSetting";
import AlertBox from "../common/AlertBox";
import { CommonContentContainer } from "../common/CommonContainers";
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
    variable: "",
    description: "",
    numberValue: "",
    textValue: "",
  });

  const resetForm = () => {
    setInitialSetting({
      variable: "",
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
        title: `Are you sure you want to add ${values.variable}?`,
        content: `By clicking continue, ${values.variable} will be added to the setting list`,
      });
      setDialogOpen(true);

      return;
    },
  });

  const addSetting = async (submitValues) => {
    const newSetting = {};

    if (submitValues.variable) {
      newSetting.variable = submitValues.variable;
    }

    if (submitValues.description) {
      newSetting.description = submitValues.description;
    }

    if (submitValues.numberValue !== "") {
      newSetting.numberValue = submitValues.numberValue;
    }

    if (submitValues.textValue !== "") {
      newSetting.textValue = submitValues.textValue;
    }

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
      message: `${submitValues.variable} added.`,
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
      <CommonContentContainer>
        <CardHeader
          title="Add Setting"
          onClick={() => setIsCardExpanded(!isCardExpanded)}
          variant="pageHeader"
          action={
            <IconButton
              onClick={() => setIsCardExpanded(!isCardExpanded)}
              aria-expanded={isCardExpanded}
              aria-label="expand/collapse"
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
      </CommonContentContainer>
    </>
  );
}
