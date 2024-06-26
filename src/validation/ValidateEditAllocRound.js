import dao from "../ajax/dao";
import {
  trimAllPropertyValueStrings,
  vF_regDescription,
  vF_regName,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  trimAllPropertyValueStrings(values);
  const errors = {};

  let allocRoundList = [];

  const getAllocRoundNames = async () => {
    const { data } = await dao.fetchAllAllocRounds();
    allocRoundList = data;
    let id;
    let filteredList = [];
    // Check if user enter an existed allocation round name
    for (const allocRound of allocRoundList) {
      if (values.id === allocRound.id) {
        id = allocRound.id;

        filteredList = allocRoundList.filter((round) => round.id !== id);
      }
    }

    return filteredList.some(
      (allocRound) =>
        allocRound.name.toLowerCase() === values.name.toLowerCase(),
    );
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
  } else if (!vF_regDescription.regExp.test(values.description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  return errors;
}
