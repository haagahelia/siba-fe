import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSetting({
  singleSetting,
  setOpen,
  incrementDataModifiedCounter,
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
  const [deleteSettingData, setDeleteSettingData] = useState(null);

  const deleteSetting = async (settingData) => {
    const result = await dao.deleteSettingById(settingData.id);
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
      message: `${settingData.name} removed.`,
    });
    setAlertOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 4000);
    incrementDataModifiedCounter();
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
    });
    setDialogOpen(true);
    setDeleteSettingData(data);
    return;
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
        submit={deleteSetting}
        submitValues={deleteSettingData}
      />
      <Button
        variant="contained"
        color="red"
        onClick={() => submitDelete(singleSetting)}
      >
        Delete
      </Button>
    </>
  );
}
