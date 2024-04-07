import dao from "../ajax/dao";
import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regAcronym,
  vF_regDescription,
  vF_regName,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  trimAllPropertyValueStrings(values);
  const errors = {};

  const isDuplicatedName = async () => {
    let spaceTypeList = [];
    const { data } = await dao.fetchAllSpaceTypes();
    spaceTypeList = data;
    let id;
    let filteredList = [];

    // Check if user enter an existed space type name except the current one
    for (const spaceType of spaceTypeList) {
      if (values.id === spaceType.id) {
        id = spaceType.id;

        filteredList = spaceTypeList.filter((spaceType) => {
          return spaceType.id !== id;
        });
      }
    }

    return filteredList.some(
      (spaceType) => spaceType.name.toLowerCase() === values.name.toLowerCase(),
    );
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await isDuplicatedName()) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (!values.acronym) {
    errors.acronym = requiredFieldErrorMessageFunction("Acronym");
  } else if (await isDuplicatedName()) {
    errors.acronym = "The acronym already exists";
  } else if (values.acronym.length < 1 || values.acronym.length > 255) {
    errors.acronym = "The acronym must be 2-255 characters long";
  } else if (!vF_regAcronym.regExp.test(values.acronym)) {
    errors.acronym = vF_regAcronym.errorMessageFunction("Acronym");
  }

  if (values.description.length > 16000) {
    errors.description =
      "The description must be maximum 16000 characters long";
  } else if (!vF_regDescription.regExp.test(values.description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  return errors;
}
