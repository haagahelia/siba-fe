import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import dao from "../../ajax/dao";
import {
  capitalizeFirstLetter,
  validate,
} from "../../validation/ValidateAddBuilding";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AddBuildingForm from "./AddBuildingForm";
import ImportBuilding from "./ImportBuildingContainer";

export default function AddBuildingContainer({ getAllBuildings }) {
  // State for checking if Add Building card is expanded
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
        submit={addBuilding}
        submitValues={formik.values}
      />
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            title="Add Building"
            onClick={() => setIsCardExpanded(!isCardExpanded)}
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
              <AddBuildingForm
                formik={formik}
                submitValues={formik.values}
                setInitialBuilding={setInitialBuilding}
              />
              <ImportBuilding getAllBuildings={getAllBuildings} />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
