import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import useTheme from "@mui/material/styles/useTheme";
import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSpaceType({
  singleSpaceType,
  getAllSpaceTypes,
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
  const [deleteSpaceTypeData, setDeleteSpaceTypeData] = useState(null);
  const [hasAssociatedSpaces, setHasAssociatedSpaces] = useState(false);
  const [spaceNames, setSpaceNames] = useState([]);
  const [totalSpaceCount, setTotalSpaceCount] = useState(0);

  // Fetch spaces associated with the spacetype
  useEffect(() => {
    if (singleSpaceType?.id) {
      dao
        .fetchSpacesBySpaceTypeId(singleSpaceType.id)
        .then((response) => {
          const spaces = response.data || [];
          setHasAssociatedSpaces(spaces.length > 0);
          setTotalSpaceCount(spaces.length);

          const displayedNames = spaces.slice(0, 5).map((space) => space.name);
          setSpaceNames(displayedNames);
        })
        .catch((error) =>
          console.error("Failed to fetch spaces for space type:", error),
        );
    }
  }, [singleSpaceType]);

  const deleteSpaceType = async (spaceTypeData) => {
    const result = await dao.deleteSpaceTypeById(spaceTypeData.id);
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
        message: `${spaceTypeData.name} deleted successfully.`,
      });
      setAlertOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);

      getAllSpaceTypes();
    }
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
      onConfirm: () => deleteSpaceType(data),
    });
    setDialogOpen(true);
    setDeleteSpaceTypeData(data);
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
        submit={() => deleteSpaceType(deleteSpaceTypeData)}
      />
      {!hasAssociatedSpaces ? (
        <Button
          variant="contained"
          style={theme.components.MuiButton.redbutton}
          onClick={() => submitDelete(singleSpaceType)}
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
              style={{ ...theme.components.MuiButton.redbutton, opacity: 0.5 }}
            >
              {`This space type has ${totalSpaceCount} space(s)`}
            </Button>
          </span>
        </Tooltip>
      )}
    </>
  );
}
