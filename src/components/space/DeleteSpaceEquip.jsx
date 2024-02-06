import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import Logger from "../../logger/logger";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSpaceEquip({
  setAlertOpen,
  setAlertOptions,
  singleSpaceEquipToDelete,
  getEquipmentsBySpaceId,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const [deleteSpaceEquip, setDeleteSpaceEquip] = useState({
    spaceId: 0,
    equipmentId: 0,
  });

  const equipmentName = singleSpaceEquipToDelete.name;

  const theme = useTheme();

  const deleteSpaceEquipment = async (submitValues = null) => {
    // We will not use submitValues
    const success = await dao.deleteSingleSpaceEquipment(
      singleSpaceEquipToDelete.spaceId,
      singleSpaceEquipToDelete.equipmentId,
    );
    if (!success) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      Logger.error("delete space equipment failed");
    } else {
      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${equipmentName} removed.`,
      });
      Logger.debug("delete space equipment success");
    }
    setAlertOpen(true);
    getEquipmentsBySpaceId(singleSpaceEquipToDelete.spaceId);
  };

  const submitDelete = (values) => {
    setDialogOptions({
      title: `Are you sure you want to remove ${values.name}?`,
      content: `Press continue to remove ${values.name} from the listing.`,
    });
    setDialogOpen(true);
    setDeleteSpaceEquip(values.spaceId, values.equipmentId);
  };

  return (
    <div>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={deleteSpaceEquipment}
        submitValues={deleteSpaceEquip}
      />
      <Button
        variant="contained"
        style={theme.components.MuiButton.redbutton}
        sx={{ maxWidth: "85px" }}
        onClick={() => {
          submitDelete(singleSpaceEquipToDelete);
        }}
      >
        Remove
      </Button>
    </div>
  );
}
