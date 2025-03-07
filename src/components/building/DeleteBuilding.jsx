import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteBuilding({
  singleBuilding,
  setSingleBuilding,
  getAllBuildings,
  setOpen,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({});
  const [deleteBuildingData, setDeleteBuildingData] = useState(null);
  const [hasAssociatedSpaces, setHasAssociatedSpaces] = useState(false);
  const [spaceNames, setSpaceNames] = useState([]);
  const [totalSpaceCount, setTotalSpaceCount] = useState(0);

  // Fetch spaces associated with the building
  useEffect(() => {
    if (singleBuilding?.id) {
      dao
        .fetchSpacesByBuildingId(singleBuilding.id)
        .then((response) => {
          const spaces = response.data || [];
          setHasAssociatedSpaces(spaces.length > 0);
          setTotalSpaceCount(spaces.length);

          const displayedNames = spaces.slice(0, 5).map((space) => space.name);
          setSpaceNames(displayedNames);
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
        message: `${buildingData.name} deleted successfully.`,
      });
      setAlertOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);

      getAllBuildings();
      setSingleBuilding(null);
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
          className="redButton"
          onClick={() => submitDelete(singleBuilding)}
        >
          Delete
        </Button>
      ) : (
        <Tooltip
          title={`Space(s): ${spaceNames.join(", ")}${
            totalSpaceCount > 5 ? ", ..." : ""
          }`}
          placement="top"
        >
          <span>
            <Button
              variant="contained"
              disabled
              className="redButton disabledButton"
            >
              {`This building has ${totalSpaceCount} space(s)`}
            </Button>
          </span>
        </Tooltip>
      )}
    </>
  );
}
