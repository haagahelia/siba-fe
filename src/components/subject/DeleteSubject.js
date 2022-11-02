import React, { useState } from "react";
import { Button } from "@mui/material";
import PopUpDialog from "./PopDialog";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSubject(props) {
  const { data, refreshSubjects } = props;
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
  const [deleteId, setDeleteId] = useState("");

  const deleteSubject = async (value) => {
    let result = await dao.deleteSingleSubject(value);
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
      message: `${value.subjectName} poistettu.`,
    });
    setAlertOpen(true);

    refreshSubjects();
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Haluatko varmasti poistaa ${data.subjectName}?`,
      content:
        `Painamalla jatka poistat ${data.subjectName} listauksesta.`,
    });
    setDialogOpen(true);
    setDeleteId(data.id);
    return;
  };

  return (
    <div>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        confirmfunction={deleteSubject}
        functionparam={deleteId}
      />
      <Button
        variant="contained"
        color="error"
        onClick={() => submitDelete(data)}
      >
        Poista
      </Button>
    </div>
  );
}
