import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import dao from "../../ajax/dao";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteSpaceType({
  singleSpaceType,
  getAllSpaceTypes,
  setOpen,
}) {
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
  const [hasAssociatedSubjects, setHasAssociatedSubjects] = useState(false);
  const [totalSubjectCount, setTotalSubjectCount] = useState(0);
  const [subjectNames, setSubjectNames] = useState([]);

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
      dao
        .fetchSubjectsBySpaceTypeId(singleSpaceType.id)
        .then((response) => {
          const subjects = response.data || [];
          setHasAssociatedSubjects(subjects.length > 0);
          setTotalSubjectCount(subjects.length);

          const displayedNames = subjects
            .slice(0, 5)
            .map((subject) => subject.name);
          setSubjectNames(displayedNames);
        })
        .catch((error) =>
          console.error("Failed to fetch subjects for space type:", error),
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
      {!hasAssociatedSpaces && !hasAssociatedSubjects ? (
        <Button
          variant="contained"
          className="redButton"
          onClick={() => submitDelete(singleSpaceType)}
        >
          Delete
        </Button>
      ) : (
        <Tooltip
          title={`
          ${
            totalSpaceCount > 0
              ? `Space(s): ${spaceNames.join(", ")}
            ${totalSpaceCount > 5 ? ", ..." : ""}`
              : ""
          }
          ${
            totalSpaceCount === 0
              ? `Lesson(s): ${subjectNames.slice(0, 5).join(", ")}
              ${totalSubjectCount > 5 ? ", ..." : ""}`
              : ""
          }
        `}
          placement="top"
        >
          <span>
            <Button
              variant="contained"
              disabled
              className="redButton disabledButton"
            >
              {`This space type has ${totalSpaceCount} space(s) and ${totalSubjectCount} lesson(s)`}
            </Button>
          </span>
        </Tooltip>
      )}
    </>
  );
}
