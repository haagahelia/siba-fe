import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSpaceEquip({
  singleEquipBySpaceId,
  getEquipmentsBySpaceId,
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
  const [deleteSpaceEquip, setDeleteSpaceEquip] = useState({
    spaceId: 0,
    equipmentId: 0,
  });

  const id1 = singleEquipBySpaceId.spaceId;
  const id2 = singleEquipBySpaceId.equipmentId;
  const equipmentName = singleEquipBySpaceId.name;

  const theme = useTheme();

  const deleteSpaceEquipment = async (spaceId, equipmentId) => {
    // TODO: Why are we reassigning function parameters here?!
    // The values of `subjectId` and `equipmentId` get always overwritten
    spaceId = id1;
    equipmentId = id2;
    const success = await dao.deleteSingleSpaceEquipment(
      spaceId,
      equipmentId,
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
    getEquipmentsBySpaceId(spaceId);
  };

  const submitDelete = (values) => {
    setDialogOptions({
      title: `Are you sure you want to remove ${values.name}?`,
      content: `Press continue to remove ${values.name} from the listing.`,
    });
    setDialogOpen(true);

    setDeleteSpaceEquip(values.spaceId, values.equipmentId);

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
        submit={deleteSpaceEquipment}
        submitValues={deleteSpaceEquip}
      />
      <Button
        variant="contained"
        style={theme.components.MuiButton.redbutton}
        sx={{ maxWidth: "85px" }}
        onClick={() => {
          submitDelete(singleEquipBySpaceId);
        }}
      >
        Remove
      </Button>
    </div>
  );
}
