import dao from "../ajax/dao";
import { vF_regName } from "./Validate_GenericRegexps";

export async function validate(values) {
  const errors = {};
  const regDescription = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);

  const isDuplicatedName = async function () {
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
    errors.name = "Required field";
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
  } else if (!regDescription.test(values.description)) {
    errors.description = "Only letters, numbers and '-' allowed";
  }

  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
