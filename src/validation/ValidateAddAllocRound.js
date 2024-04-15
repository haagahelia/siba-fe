import dao from "../ajax/dao";
import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regDescription,
  vF_regName,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  const errors = {};
  //console.dir(Object.keys(values));
  trimAllPropertyValueStrings(values);

  let allocRoundList = [];
  const getAllocRoundNames = async () => {
    const { data } = await dao.fetchAllAllocRounds();
    allocRoundList = data;
    // Check if user enter an existed allocation round name
    const result = allocRoundList.some(
      (names) => names.name.trim().toLowerCase() === values.name.toLowerCase(),
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

  if (!values.description) {
    errors.description = requiredFieldErrorMessageFunction("Description");
  } else if (
    values.description.length < 2 ||
    values.description.length > 16000
  ) {
    errors.description =
      "The description must be between 2 and 16000 characters long";
  } else if (!vF_regDescription.regExp.test(values.description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  return errors;
}
