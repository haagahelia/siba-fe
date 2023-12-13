import dao from "../ajax/dao";
import Logger from "../logger/logger";
import { vF_regName } from "./Validate_GenericRegexps";

export async function validate(values) {
  const errors = {};
  const regNumber = new RegExp(/^[0-9]+$/);

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
    errors.name = "Required field";
  } else if (await getProgramNames()) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (!values.departmentId) {
    errors.departmentId = "Required field";
  } else if (!regNumber.test(values.departmentId)) {
    errors.departmentId = "Invalid department ID";
  }

  // Add additional validation rules as needed for other fields.

  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
