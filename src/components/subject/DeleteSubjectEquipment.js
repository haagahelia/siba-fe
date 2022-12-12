import React, { useState } from "react";
import dao from "../../ajax/dao";
import { Button } from "@mui/material";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AlertBox from "../common/AlertBox";

export default function DeleteSubjectEquipment(props) {
  const { values, equipmentNames } = props;

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
  let id1 = values.subjectId;
  let id2 = values.equipmentId;
  let equipmentName = values.name;

  const deleteSubjectEquipment = async (subjectId, equipmentId) => {
    subjectId = id1;
    equipmentId = id2;
    let result = await dao.deleteSingleSubjectEquipment(subjectId, equipmentId);
    if (result === 400) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }

    if (result === "error") {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message:
          "Jokin meni pieleen, opetuksen poisto epäonnistui - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }

    setAlertOptions({
      severity: "success",
      title: "Onnistui!",
      message: equipmentName + " poistettu.",
    });
    setAlertOpen(true);
    equipmentNames(subjectId);
  };

  const submitDelete = (values) => {
    setDialogOptions({
      title: "Haluatko varmasti poistaa " + values.name + "?",
      content: "Painamalla jatka poistat " + values.name + " listauksesta.",
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
      ></AlertBox>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        confirmfunction={deleteSubjectEquipment}
        functionparam={deleteSubEquip}
      ></ConfirmationDialog>
      <Button
        variant="contained"
        color="error"
        sx={{ margin: "5px", maxWidth: "85px" }}
        onClick={() => {
          submitDelete(values);
        }}
      >
        Poista
      </Button>
    </div>
  );
}
