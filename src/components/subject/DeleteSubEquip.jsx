import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import { margins } from "../../styles/theme";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSubEquip({
  singleSubjectToDelete,
  getEquipmentsBySubId,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const [deleteSubEquip, setDeleteSubEquip] = useState({
    subjectId: 0,
    equipmentId: 0,
  });

  const equipmentName = singleSubjectToDelete.name;

  const theme = useTheme();

  const deleteSubjectEquipment = async (submitValues = null) => {
    // We will not use submitValues
    const success = await dao.deleteSingleSubjectEquipment(
      singleSubjectToDelete.subjectId,
      singleSubjectToDelete.equipmentId,
    );
    if (!success) {
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
      message: `${equipmentName} removed.`,
    });
    setAlertOpen(true);
    getEquipmentsBySubId(singleSubjectToDelete.subjectId);
  };

  const submitDelete = (values) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${values.name}?`,
      content: `Press continue to delete ${values.name} from the listing.`,
    });
    setDialogOpen(true);

    setDeleteSubEquip(values.subjectId, values.equipmentId);

    return;
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={deleteSubjectEquipment}
        submitValues={deleteSubEquip}
      />
      <Button
        variant="contained"
        style={theme.components.MuiButton.redbutton}
        sx={{ marginLeft: margins.small, maxWidth: "85px" }}
        onClick={() => {
          submitDelete(singleSubjectToDelete);
        }}
      >
        Delete
      </Button>
    </div>
  );
}
