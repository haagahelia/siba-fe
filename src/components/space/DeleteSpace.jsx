import { useEffect, useState } from "react";
import dao from "../../ajax/dao";

import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSpace({ singleSpace, getAllSpaces, setOpen }) {
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
  const [deleteSpaceData, setDeleteSpaceData] = useState(null);
  const [allocspcaeCount, setAllocspaceCount] = useState(0);
  const [hasAssociatedAllocations, setHasAssociatedAllocations] =
    useState(false);

  // fetch no. of allocations associated with the space
  useEffect(() => {
    if (singleSpace?.id) {
      dao
        .fetchNumberOfAllocSpaces(singleSpace.id)
        .then((response) => {
          const allocCount = response.data[0];
          const count = allocCount["count(`allocRoundId`)"];
          setAllocspaceCount(count);
          setHasAssociatedAllocations(count > 0);
        })
        .catch((error) =>
          console.error("Failed to fetch allocations for space:", error),
        );
    }
  }, [singleSpace]);

  const deleteSpace = async (spaceData) => {
    const result = await dao.deleteSingleSpace(spaceData.id);
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
      message: `${spaceData.name} deleted successfully.`,
    });
    setAlertOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 4000);

    getAllSpaces();
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
    });
    setDialogOpen(true);
    setDeleteSpaceData(data);
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
        submit={deleteSpace}
        submitValues={deleteSpaceData}
      />
      {!hasAssociatedAllocations ? (
        <Button
          variant="contained"
          className="redButton"
          onClick={() => submitDelete(singleSpace)}
        >
          Delete
        </Button>
      ) : (
        <Tooltip placement="top">
          <span>
            {`This space has associated ${allocspcaeCount} allocations`}
            <br />
            <Button
              variant="contained"
              className="redButton disabledButton"
              disabled
            >
              Delete
            </Button>
          </span>
        </Tooltip>
      )}
    </div>
  );
}
