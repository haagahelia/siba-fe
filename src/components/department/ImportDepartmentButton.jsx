import { useState } from "react";
import dao from "../../ajax/dao";
import { importData } from "../../importDataFunctions/importData";
import { validate } from "../../validation/ValidateAddDepartment";

import Button from "@mui/material/Button";
import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import AlertBox from "../common/AlertBox";

export default function ImportDepartmentButton({
  departmentToImport,
  departmentFailedToImport,
  setDepartmentFailedToImport,
  getAllDepartments,
  fileOptions,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const processDepartment = async (department, departmentSet) => {
    const newDepartment = {
      name: department.name ? capitalizeFirstLetter(department.name) : "",
      description: department.description ? department.description : "",
    };

    if (departmentSet.has(newDepartment.name)) {
      department.FailedReason = "Name of department is duplicated in the file";
      return department;
    }
    departmentSet.add(newDepartment.name);

    const validateResult = await validate(newDepartment);
    department.FailedReason = validateResult.name || validateResult.description;

    return department.FailedReason ? department : newDepartment;
  };

  const handleClick = async () => {
    await importData(
      departmentToImport,
      departmentFailedToImport,
      setDepartmentFailedToImport,
      getAllDepartments,
      processDepartment,
      dao.addDepartments,
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
