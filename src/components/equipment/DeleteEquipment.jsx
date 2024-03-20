import { useEffect, useState } from "react";
import dao from "../../ajax/dao";

import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Logger from "../../logger/logger";
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
  const [namesOfSubjects, setNamesOfSubjects] = useState([]);

  // fetch number of subjects associated with the equipment
  const fetchNumberOfSubjects = async () => {
    const response = await dao.fetchSubjectCount(singleEquipment.id);
    if (response === null) {
      return "Error fetching number of subjects";
    }
    const subjectCount = response.data[0];
    const count = subjectCount["count(`subjectId`)"];
    setHasAssociatedSubjects(count > 0);
    return count;
  };
  // fetch no. of subjects associated with the equipment
  useEffect(() => {
    if (open && singleEquipment) {
      Logger.debug(
        `Rendering SingleEquipmentDialog for equipment: ${JSON.stringify(
          singleEquipment,
        )}`,
      );
      fetchNumberOfSubjects(singleEquipment.id)
        .then((data) => {
          setSubjectIdCount(data);
        })
        .catch((error) => {
          Logger.error(error);
        });
    }
  }, [open, singleEquipment]);

  // fetches fisrt five subject names associated with the equipment by id
  const fetchFirstFiveSubjectNames = async () => {
    const response = await dao.fetchSubjectsFirstFiveNames(singleEquipment?.id);
    if (response.httpStatus !== 200) {
      return "Error fetching first five subject names";
    }
    const displayFirstFiveNames = response.data.map((subject) => subject.name);
    return displayFirstFiveNames;
  };

  // fetches the first five subject names by equipment id for the dialog.
  useEffect(() => {
    if (open && singleEquipment) {
      Logger.debug(
        `Rendering SingleEquipmentDialog for equipment: ${JSON.stringify(
          singleEquipment,
        )}`,
      );
      fetchFirstFiveSubjectNames(singleEquipment.id)
        .then((data) => {
          setNamesOfSubjects(data);
        })
        .catch((error) => {
          Logger.error(error);
        });
    }
  }, [open, singleEquipment]);

  // delete equipment
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
        <Tooltip
          title={`Subjects: ${namesOfSubjects.join(", ")}
            ${subjecIdtCount > 5 ? ", ..." : ""}`}
        >
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
