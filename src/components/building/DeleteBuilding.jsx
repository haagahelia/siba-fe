import { useState } from "react";
import dao from "../../ajax/dao";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteBuilding({
  singleBuilding,
  getAllBuildings,
  setOpen,
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
  const [deleteBuildingData, setDeleteBuildingData] = useState(null);

  const deleteBuilding = async (buildingData) => {
    const result = await dao.deleteBuildingById(buildingData.id);
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
      message: `${buildingData.name} removed successfully.`,
    });
    setAlertOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 4000);

    getAllBuildings();
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
    });
    setDialogOpen(true);
    setDeleteBuildingData(data);
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
        submit={deleteBuilding}
        submitValues={deleteBuildingData}
      />
      <Button
        variant="contained"
        color="red"
        onClick={() => submitDelete(singleBuilding)}
      >
        Delete
      </Button>
    </>
  );
}
