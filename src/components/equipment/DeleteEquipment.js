import React, { useState } from "react";
import { Button } from "@mui/material";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteEquipment(props) {
  const { singleEquipment, getAllEquipments, setOpen } = props;
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

  const deleteEquipment = async (value) => {
    let result = await dao.deleteSingleEquipment(value);
    console.log(result);
    if (result === false) {
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
      message: `${value.name} removed.`,
    });
    setAlertOpen(true);
    setOpen(false);

    getAllEquipments();
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
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
        submit={deleteEquipment}
        submitValues={deleteId}
      />
      <Button
        variant="contained"
        color="red"
        onClick={() => submitDelete(singleEquipment)}
      >
        Delete
      </Button>
    </div>
  );
}
