import dao from "../ajax/dao";
import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regDescription,
  vF_regName,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  trimAllPropertyValueStrings(values);
  const errors = {};

  let departmentList = [];

  const getDepartmentNames = async function () {
    const { data } = await dao.fetchDepartmentData();
    departmentList = data;
    // Check if user enter an existed building name
    const result = departmentList.some(
      (names) => names.name.toLowerCase() === values.name.toLowerCase(),
    );

    return result;
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await getDepartmentNames()) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (values.description.length > 16000) {
    errors.description =
      "The description must be maximum 16000 characters long";
  } else if (!vF_regDescription.regExp.test(values.description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
