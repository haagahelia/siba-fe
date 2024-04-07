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

  const isDuplicatedSpaceTypeName = async (name) => {
    const { data } = await dao.fetchAllSpaceTypes();
    let spaceTypeList = [];
    spaceTypeList = data;
    // Check if user entered an existing space type name
    const result = spaceTypeList.some(
      (spaceType) => spaceType.name.trim().toLowerCase() === name.toLowerCase(),
    );

    return result;
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await isDuplicatedSpaceTypeName(values.name)) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (!values.acronym) {
    errors.acronym = requiredFieldErrorMessageFunction("Acronym");
  } else if (await isDuplicatedSpaceTypeName(values.acronym)) {
    errors.acronym = "The acronym already exists";
  } else if (values.acronym.length < 1 || values.acronym.length > 255) {
    errors.acronym = "The acronym must be 1-255 characters long";
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
