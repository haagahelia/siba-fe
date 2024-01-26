import dao from "../ajax/dao";
import Logger from "../logger/logger";
import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regName,
  vF_regNumber,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  trimAllPropertyValueStrings(values);
  const errors = {};

  let programList = [];

  const getProgramNames = async function () {
    const { httpStatus, data } = await dao.fetchProgramsWithDepartments();
    if (httpStatus === 200) {
      programList = data;
      const result = programList.some(
        (program) => program.name.toLowerCase() === values.name.toLowerCase(),
      );
      return result;
    } else {
      Logger.error(`getProgramNames failed, http status code: ${httpStatus}`);
    }
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await getProgramNames()) {
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

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
