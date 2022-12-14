import React, { useState } from "react";
import { Button, ThemeProvider } from "@mui/material";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { globalTheme } from "../styles/theme";

export default function DeleteSubject(props) {
  const { singleSubject, getAllSubjects, setOpen } = props;
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
    setOpen(false);

    getAllSubjects();
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
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={deleteSubject}
        submitValues={deleteId}
      />
      <ThemeProvider theme={globalTheme}>
        <Button
          variant="contained"
          color="red"
          onClick={() => submitDelete(singleSubject)}
        >
          Poista
        </Button>
      </ThemeProvider>
    </div>
  );
}
