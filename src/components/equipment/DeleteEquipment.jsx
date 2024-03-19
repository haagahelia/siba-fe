import { useEffect, useState } from "react";
import dao from "../../ajax/dao";

import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function DeleteEquipment({
  singleEquipment,
  getAllEquipments,
  setOpen,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const [deleteEquipmentData, setDeleteEquipmentData] = useState(null);
  const [subjecIdtCount, setSubjectIdCount] = useState(0);
  const [HasasAssociatedSubject, setHasAssociatedSubjects] = useState(false);

  // fetch no. of subjects associated with the equipment
  useEffect(() => {
    if (singleEquipment?.id) {
      dao
        .fetchSubjectCount(singleEquipment.id)
        .then((response) => {
          const subjectCount = response.data[0];
          const count = subjectCount["count(`subjectId`)"];
          setSubjectIdCount(count);
          setHasAssociatedSubjects(count > 0);
        })
        .catch((error) =>
          console.error("Failed to fetch subjects for equipment:", error),
        );
    }
  }, [singleEquipment]);

  const deleteEquipment = async (equipmentData) => {
    const result = await dao.deleteSingleEquipment(equipmentData.id);
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
      message: `${equipmentData.name} deleted successfully.`,
    });
    setAlertOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 4000);

    getAllEquipments();
  };

  const submitDelete = (data) => {
    setDialogOptions({
      title: `Are you sure you want to delete ${data.name}?`,
      content: `Press continue to delete ${data.name} from the listing.`,
    });
    setDialogOpen(true);
    setDeleteEquipmentData(data);
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
        submitValues={deleteEquipmentData}
      />
      {!HasasAssociatedSubject ? (
        <Button
          variant="contained"
          className="redButton"
          onClick={() => submitDelete(singleEquipment)}
        >
          Delete
        </Button>
      ) : (
        <Tooltip>
          <span>
            {`This equipment is associated to ${subjecIdtCount} subjects`}
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
