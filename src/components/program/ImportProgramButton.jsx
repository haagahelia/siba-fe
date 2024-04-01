import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import { validate } from "../../validation/ValidateAddProgram";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";

export default function ImportProgramButton({
  programToImport,
  programFailedToImport,
  setProgramFailedToImport,
  getAllPrograms,
  departmentSelectList,
  fileOptions,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const isDepartmentNameCorrect = (program) =>
    departmentSelectList.some((department) =>
      department.name.includes(program.department),
    );

  const processProgram = async (program, programSet) => {
    if (!isDepartmentNameCorrect(program)) {
      program.FailedReason = "Non-existent department";
    } else {
      const newProgram = {
        name: program.name ? program.name : "",
        departmentName: program.department ? program.department : "",
      };

      const validateResult = await validate(newProgram);
      if (validateResult) {
        program.FailedReason = validateResult.name;
        return program;
      }
      return newProgram;
    }
    return program;
  };

  const handleClick = async () => {
    await importData(
      programToImport,
      programFailedToImport,
      setProgramFailedToImport,
      getAllPrograms,
      processProgram,
      dao.postNewPrograms,
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
