import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddSpaceType";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Logger from "../../logger/logger";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddSpaceTypeForm from "./AddSpaceTypeForm";
import ImportSpaceTypeContainer from "./ImportSpaceTypeContainer";
import SpaceTypeTemplate from "./SpaceTypeTemplate";

export default function AddSpaceTypeContainer({ getAllSpaceTypes }) {
  // State for checking if Add SpaceType card is expanded
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
  const [initialSpaceType, setInitialSpaceType] = useState({
    name: "",
    description: "",
  });

  const resetForm = () => {
    setInitialSpaceType({
      name: "",
      description: "",
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialSpaceType,
    validate: (values) => {
      Logger.debug("Formik validate");
      return validate(values);
    },
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.name}?`,
        content: `By clicking continue, ${values.name} will be added to the space type list`,
      });
      setDialogOpen(true);

      return;
    },
  });

  const addSpaceType = async (submitValues) => {
    const newSpaceType = {
      name: capitalizeFirstLetter(submitValues.name),
      description: submitValues.description,
    };

    const result = await dao.postNewSpaceType(newSpaceType);
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
      message: `${submitValues.name} added successfully.`,
    });
    setAlertOpen(true);
    resetForm();
    getAllSpaceTypes();
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
        submit={addSpaceType}
        submitValues={formik.values}
      />
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title="Add Space Type"
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
            <>
              <AddSpaceTypeForm
                formik={formik}
                submitValues={formik.values}
                setInitialSpaceType={setInitialSpaceType}
              />
              <ImportSpaceTypeContainer getAllSpaceTypes={getAllSpaceTypes} />
              <SpaceTypeTemplate />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
