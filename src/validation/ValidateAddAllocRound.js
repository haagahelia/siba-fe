import dao from "../ajax/dao";
import {
  requiredFieldErrorMessageFunction,
  vF_regName,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  const errors = {};
  const regDescription = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);

  let allocRoundList = [];

  const getAllocRoundNames = async function () {
    const { data } = await dao.fetchAllAllocRounds();
    allocRoundList = data;
    // Check if user enter an existed allocation round name
    const result = allocRoundList.some(
      (names) => names.name.toLowerCase() === values.name.toLowerCase(),
    );

    return result;
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await getAllocRoundNames()) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (values.description.length > 16000) {
    errors.description =
      "The description must be maximum 16000 characters long";
  } else if (!regDescription.test(values.description)) {
    errors.description = "Only letters, numbers and '-' allowed";
  }

  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
