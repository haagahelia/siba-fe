import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import Logger from "../../logger/logger";
import useTheme from "@mui/material/styles/useTheme";
import { margins } from "../../styles/theme";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSubEquip({
  setAlertOpen,
  setAlertOptions,
  singleSubEquipToDelete,
  getEquipmentsBySubId,
}) {
 
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const [deleteSubEquip, setDeleteSubEquip] = useState({
    subjectId: 0,
    equipmentId: 0,
  });

  const equipmentName = singleSubEquipToDelete.name;

  const theme = useTheme();

  const deleteSubjectEquipment = async (submitValues = null) => {
    // We will not use submitValues
    const success = await dao.deleteSingleSubjectEquipment(
      singleSubEquipToDelete.subjectId,
      singleSubEquipToDelete.equipmentId,
    );
   
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
      message: `${equipmentName} removed.`,
    });
    Logger.debug("delete subject equipment success");
  }
    setAlertOpen(true);
    getEquipmentsBySubId(singleSubEquipToDelete.subjectId);
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
          submitDelete(singleSubEquipToDelete);
        }}
      >
        Delete
      </Button>
    </div>
  );
}
