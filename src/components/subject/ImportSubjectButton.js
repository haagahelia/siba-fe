import Button from "@mui/material/Button";
import { useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import {
  capitalizeFirstLetter,
  validate,
} from "../../validation/ValidateAddSubject";
import AlertBox from "../common/AlertBox";

export default function ImportSubjectButton({
  importSubjects,
  failedSubjects,
  setFailedSubjects,
  getAllSubjects,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const importData = async () => {
    let successCount = 0;
    let failedCount = 0;
    const tempFailedSubjects = [];
    const subjectsToSend = [];
    const subjectSet = new Set();

    await Promise.all(
      importSubjects.map(async (subject) => {
        const newSubject = {
          name: subject["Name of the lesson"] ? capitalizeFirstLetter(subject["Name of the lesson"]) : "",
          groupSize: subject["Group size"] ? subject["Group size"] : "",
          groupCount: subject["Group count"] ? subject["Group count"] : "",
          sessionLength: subject["Length of session"] ? subject["Length of session"] : "",
          sessionCount: subject["Number of lessons per week"] ? subject["Number of lessons per week"] : "",
          area: subject["Required square meters"] ? subject["Required square meters"] : "",
          major: subject["Major"] ? subject["Major"] : "",
          roomType: subject["Room type"] ? subject["Room type"] : "",
        };

        // check if there is duplicated name of building after capitalization
        if (subjectSet.has(newSubject.name)) {
          subject.FailedReason = "Name of lesson is duplicated in the file";
          tempFailedSubjects.push(subject);
          failedCount++;

          return;
        } else {
          subjectSet.add(newSubject.name);
        }

        const validateResult = await validate(newSubject);

        if (validateResult.name) {
          subject.FailedReason = validateResult.name;
          tempFailedSubjects.push(subject);
          failedCount++;
        } else if (validateResult.description) {
          subject.FailedReason = validateResult.description;
          tempFailedSubjects.push(subject);
          failedCount++;
        } else if (validateResult.groupSize) {
          subject.FailedReason = validateResult.groupSize;
          tempFailedSubjects.push(subject);
          failedCount++;
        } else if (validateResult.groupCount) {
          subject.FailedReason = validateResult.groupCount;
          tempFailedSubjects.push(subject);
          failedCount++;
        } else if (validateResult.sessionLength) {
          subject.FailedReason = validateResult.sessionLength;
          tempFailedSubjects.push(subject);
          failedCount++;
        } else if (validateResult.sessionCount) {
          subject.FailedReason = validateResult.sessionCount;
          tempFailedSubjects.push(subject);
          failedCount++;
        } else if (validateResult.area) {
          subject.FailedReason = validateResult.area;
          tempFailedSubjects.push(subject);
          failedCount++;
        }
        else {
          subjectsToSend.push(newSubject);
          successCount++;
        }
      }),
    );

    setFailedSubjects([...failedSubjects, ...tempFailedSubjects]);
    Logger.debug("failed lessons", tempFailedSubjects);

    // if the data is empty after validation, not sending to backend
    if (subjectsToSend.length === 0) {
      setAlertOptions({
        severity: "error",
        title: "Error!",
        message: `Something wrong happened. ${failedCount} lesson failed to add.`,
      });
      setAlertOpen(true);

      return;
    }

    Logger.debug("subjectsToSend", subjectsToSend);

    const result = await dao.postNewSubjects(subjectsToSend);

    if (result) {
      getAllSubjects();

      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${successCount} lessons added and ${failedCount} lesson failed to add.`,
      });
      setAlertOpen(true);
    } else {
      setAlertOptions({
        severity: "error",
        title: "Error!",
        message: `Something wrong happened. ${failedCount} lesson failed to add.`,
      });
      setAlertOpen(true);
    }
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
          importData();
        }}
      >
        Import data
      </Button>
    </>
  );
}
