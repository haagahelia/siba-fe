import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { AllocRoundContext } from "../../AppContext";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import Logger from "../../logger/logger";
import { validate } from "../../validation/ValidateAddSubject";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";

export default function ImportSubjectButton({
  progNameList,
  subjectToImport,
  subjectFailedToImport,
  setSubjectFailedToImport,
  getAllSubjects,
  spaceTypeSelectList,
  fileOptions,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const { allocRoundContext } = useContext(AllocRoundContext);
  Logger.debug("allocRoundId", allocRoundContext?.allocRoundId);

  const isProgramAuthorized = (subject) => {
    return progNameList.includes(subject.Major);
  };

  const isSpaceNameCorrect = (subject) =>
    spaceTypeSelectList.some((space) =>
      space.name.includes(subject["Room type"]),
    );

  const processSubject = async (subject, subjectSet) => {
    if (!isProgramAuthorized(subject)) {
      subject.FailedReason = "Not authorized for this program";
    } else if (!isSpaceNameCorrect(subject)) {
      subject.FailedReason = "Non-existent Room type";
    } else {
      const newSubject = {
        name: subject["Name of the lesson"]
          ? capitalizeFirstLetter(subject["Name of the lesson"])
          : "",
        groupSize: subject["Group size"] ? subject["Group size"] : "",
        groupCount: subject["Group count"] ? subject["Group count"] : "",
        sessionLength: subject["Length of session"]
          ? subject["Length of session"]
          : "",
        sessionCount: subject["Number of lessons per week"]
          ? subject["Number of lessons per week"]
          : "",
        area: subject["Required square meters"]
          ? subject["Required square meters"]
          : "",
        major: subject.Major ? subject.Major : "",
        roomType: subject["Room type"] ? subject["Room type"] : "",
        isNoisy: subject.isNoisy.toLowerCase() === "yes" ? 1 : 0,
      };

      if (subjectSet.has(newSubject.name)) {
        subject.FailedReason = "Name of lesson is duplicated in the file";
        return subject;
      }
      subjectSet.add(newSubject.name);

      const validateResult = await validate(
        newSubject,
        allocRoundContext?.allocRoundId,
      );

      subject.FailedReason =
        validateResult.name ||
        validateResult.description ||
        validateResult.groupSize ||
        validateResult.groupCount ||
        validateResult.sessionLength ||
        validateResult.sessionCount ||
        validateResult.area ||
        validateResult.isNoisy;

      return subject.FailedReason ? subject : newSubject;
    }
    return subject;
  };

  const handleClick = async () => {
    await importData(
      subjectToImport,
      subjectFailedToImport,
      setSubjectFailedToImport,
      getAllSubjects,
      processSubject,
      (importedSubjectList) =>
        dao.postNewSubjects(
          importedSubjectList,
          allocRoundContext?.allocRoundId,
        ),
      setAlertOpen,
      setAlertOptions,
      fileOptions,
    );
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Button
        variant="addComponentFormButton"
        onClick={() => {
          handleClick();
        }}
      >
        Import data
      </Button>
    </>
  );
}
