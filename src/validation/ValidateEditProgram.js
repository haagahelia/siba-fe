import dao from "../ajax/dao";
import Logger from "../logger/logger";
import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regName,
  vF_regNumber,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  Logger.debug("validate in ValidateAddProgram starts");
  Logger.debug(`Values: ${values}`);
  console.dir(values);
  trimAllPropertyValueStrings(values);
  const errors = {};

  const isDuplicatedProgramName = async (name) => {
    const { httpStatus, data } = await dao.fetchProgramsWithDepartments();
    if (httpStatus === 200) {
      let programList = [];
      programList = data;
      let id;
      let filteredPrograms = [];

      for (const program of programList) {
        if (values.id === program.id) {
          id = program.id;
        }
      }

      filteredPrograms = programList.filter((program) => {
        return program.id !== id;
      });

      const result = filteredPrograms.some(
        (program) => program.name.trim().toLowerCase() === name.toLowerCase(),
      );
      return result;
    } else {
      Logger.error(
        `checkProgramNameDuplicates failed, http status code: ${httpStatus}`,
      );
    }
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await isDuplicatedProgramName(values.name)) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (!values.departmentId) {
    errors.departmentId = requiredFieldErrorMessageFunction("Department id");
  } else if (!vF_regNumber.regExp.test(values.departmentId)) {
    errors.departmentId = vF_regNumber.errorMessageFunction("Department id");
  }

  // Add additional validation rules as needed for other fields.

  return errors;
}
