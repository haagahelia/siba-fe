import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteBuilding({
  singleBuilding,
  getAllBuildings,
  setOpen,
}) {
  const theme = useTheme();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({});
  const [deleteBuildingData, setDeleteBuildingData] = useState(null);
  const [hasAssociatedSpaces, setHasAssociatedSpaces] = useState(false);

  // Fetch spaces associated with the building
  useEffect(() => {
    if (singleBuilding?.id) {
      dao
        .fetchSpacesByBuildingId(singleBuilding.id)
        .then((response) => {
          setHasAssociatedSpaces(response.data && response.data.length > 0);
        })
        .catch((error) =>
          console.error("Failed to fetch spaces for building:", error),
        );
    }
  }, [singleBuilding]);

  const deleteBuilding = async (buildingData) => {
    const result = await dao.deleteBuildingById(buildingData.id);
    if (result === false) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
    } else {
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
    }
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
      onConfirm: () => deleteBuilding(data),
    });
    setDialogOpen(true);
    setDeleteBuildingData(data);
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
        submit={() => deleteBuilding(deleteBuildingData)}
      />
      {!hasAssociatedSpaces ? (
        <Button
          variant="contained"
          style={theme.components.MuiButton.redbutton}
          onClick={() => submitDelete(singleBuilding)}
        >
          Delete
        </Button>
      ) : (
        <Button
          variant="contained"
          disabled
          style={{ ...theme.components.MuiButton.redbutton, opacity: 0.5 }}
        >
          Delete (Spaces Present)
        </Button>
      )}
    </>
  );
}
