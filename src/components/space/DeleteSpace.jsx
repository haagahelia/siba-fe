import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
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
  const [firstFiveAllocNames, setFirstFiveAllocNames] = useState([]);

  // fetch no. of allocations associated with the space

  const getAllocSpaceCount = async () => {
    const response = await dao.fetchNumberOfAllocSpaces(singleSpace.id);
    if (response.httpStatus !== 200) {
      return "Error fetching number of allocations";
    }
    const allocCount = response.data[0];
    const count = allocCount["count(`allocRoundId`)"];
    setAllocspaceCount(count);
    setHasAssociatedAllocations(count > 0);
    return count;
  };
  useEffect(() => {
    if (open && singleSpace) {
      Logger.debug(
        `Rendering SingleSpaceDialog for space: ${JSON.stringify(singleSpace)}`,
      );
      getAllocSpaceCount(singleSpace.id)
        .then((data) => {
          setAllocspaceCount(data);
        })
        .catch((error) =>
          console.error("Failed to fetch allocations for space:", error),
        );
    }
  }, [singleSpace]);

  // fetches fisrt five allocation names associated with the space by id
  const getFirstFiveAllocNames = async () => {
    const response = await dao.fetchFirstFiveAllocNames(singleSpace.id);
    if (response.httpStatus !== 200) {
      return "Error fetching first five allocation names";
    }
    const displayNmaes = response.data.map((alloc) => alloc.name);
    return displayNmaes;
  };

  useEffect(() => {
    if (open && singleSpace) {
      Logger.debug(
        `Rendering SingleSpaceDialog for space: ${JSON.stringify(singleSpace)}`,
      );
      getFirstFiveAllocNames(singleSpace.id)
        .then((data) => {
          setFirstFiveAllocNames(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [open, singleSpace]);

  // delete space
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
        <Tooltip
          title={`Associated allocations: ${firstFiveAllocNames.join(", ")}
         ${allocspcaeCount > 5 ? ", ..." : ""}`}
          placement="top"
        >
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
