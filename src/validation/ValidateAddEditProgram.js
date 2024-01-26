import dao from "../ajax/dao";
import { vF_regName } from "./Validate_GenericRegexps";
import { trimAllPropertyValueStrings } from "./Validate_GenericRegexps";

export async function validate(values) {
  trimAllPropertyValueStrings(values);
  const errors = {};

  let programList = [];

  const getProgramNames = async function () {
    const { data } = await dao.fetchProgramData();
    programList = data;
    // Check if user enter an existed program name
    const result = programList.some(
      (names) => names.name.toLowerCase() === values.name.toLowerCase(),
    );

    return result;
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

  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
