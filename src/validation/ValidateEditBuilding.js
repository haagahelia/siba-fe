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

  const isDuplicatedName = async () => {
    let buildingList = [];
    const { data } = await dao.fetchAllBuildings();
    buildingList = data;
    let id;
    let filteredList = [];

    // Check if user enter an existed building name except the current one
    for (const building of buildingList) {
      if (values.id === building.id) {
        id = building.id;

        filteredList = buildingList.filter((building) => {
          return building.id !== id;
        });
      }
    }

    return filteredList.some(
      (building) => building.name.toLowerCase() === values.name.toLowerCase(),
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

  if (values.description.length > 16000) {
    errors.description =
      "The description must be maximum 16000 characters long";
  } else if (!vF_regDescription.regExp.test(values.description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  return errors;
}
