import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import {
  capitalizeFirstLetter,
  validate,
} from "../../validation/ValidateAddSubject";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";

export default function ImportSubjectButton({
  progNameList,
  subjectToImport,
  subjectFailedToImport,
  setSubjectFailedToImport,
  getAllSubjects,
  spaceTypeSelectList,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

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
      return subject;
    } else if (!isSpaceNameCorrect(subject)) {
      subject.FailedReason = "Non-existent Room type";
      return subject;
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
      };

      if (subjectSet.has(newSubject.name)) {
        subject.FailedReason = "Name of lesson is duplicated in the file";
        return subject;
      } else {
        subjectSet.add(newSubject.name);
      }

      const validateResult = await validate(newSubject);

      subject.FailedReason =
        validateResult.name ||
        validateResult.description ||
        validateResult.groupSize ||
        validateResult.groupCount ||
        validateResult.sessionLength ||
        validateResult.sessionCount ||
        validateResult.area;

      return subject.FailedReason ? subject : newSubject;
    }
  };

  const handleClick = async () => {
    await importData(
      subjectToImport,
      subjectFailedToImport,
      setSubjectFailedToImport,
      getAllSubjects,
      processSubject,
      dao.postNewSubjects,
      setAlertOpen,
      setAlertOptions,
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
        variant="contained"
        onClick={() => {
          handleClick();
        }}
      >
        Import data
      </Button>
    </>
  );
}
