import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import ValidateAddEquipment, {} from "../../validation/ValidateAddEquipment";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import { CommonContentContainer } from "../common/CommonContainers";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddEquipmentForm from "./AddEquipmentForm";
import EquipmentTemplate from "./EquipmentTemplate";
import ImportEquipmentContainer from "./ImportEquipmentContainer";

export default function AddEquipment({ getAllEquipments }) {
  // State for checking if Add Equipment card is expanded
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "Title here",
    content: "Content here",
  });
  const [equipment, setEquipment] = useState({
    name: "",
    priority: "",
    description: "",
    isMovable: "",
  });

  const resetForm = () => {
    setEquipment({
      name: "",
      priority: "",
      description: "",
      isMovable: "",
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: equipment,
    validateOnChange: true,
    validate: ValidateAddEquipment,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.name}?`,
        content: `By clicking continue, ${values.name} will be added to equipments.`,
      });
      return setDialogOpen(true);
    },
  });

  const addSingleEquipment = async (submitValues) => {
    const newEquipment = {
      name: capitalizeFirstLetter(submitValues.name),
      description: submitValues.description,
      isMovable: submitValues.isMovable,
      priority: submitValues.priority,
    };
    const success = await dao.postNewEquipment(newEquipment);
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
        message: `${equipment?.name} added successfully.`,
      });
      resetForm();
    }
    setAlertOpen(true);
    getAllEquipments();
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
        submit={addSingleEquipment}
        submitValues={formik.values}
      />
      <CommonContentContainer>
        <CardHeader
          title="Add Equipment"
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
          <>
            <AddEquipmentForm
              formik={formik}
              submitValues={formik.values}
              setEquipment={setEquipment}
            />
            <Grid item xs={12}>
              <ImportEquipmentContainer getAllEquipments={getAllEquipments} />
              <EquipmentTemplate />
            </Grid>
          </>
        )}
      </CommonContentContainer>
    </>
  );
}
