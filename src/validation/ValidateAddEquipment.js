import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regDescription,
  vF_regName,
  vF_regNumberCountPlus,
} from "./Validate_GenericRegexps";
import { isDuplicatedEquipmentName } from "./ValidationUtilities";

export default async function ValidateAddEquipment(values) {
  trimAllPropertyValueStrings(values);
  const errors = {};
  const { name, priority, description, isMovable } = values;

  if (!name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await isDuplicatedEquipmentName(name)) {
    errors.name = "The name already exists";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "Equipment name needs to be between 2 and 255 characters.";
  } else if (!vF_regName.regExp.test(name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (!priority) {
    errors.priority = requiredFieldErrorMessageFunction("Priority");
  } else if (priority < 1) {
    errors.priority = vF_regNumberCountPlus.errorMessageFunction("Priority");
  }

  if (description.length > 16000) {
    errors.description = "Description cannot exceed 16000 characters.";
  } else if (!vF_regDescription.regExp.test(description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  if (isMovable === null || isMovable === undefined || isMovable === "") {
    errors.isMovable = requiredFieldErrorMessageFunction("is Movable marking");
  } else if (!["0", "1", 0, 1].includes(isMovable)) {
    errors.isMovable =
      "isMovable needs to be 1 = movable equipment. 0 = unmovable equipment.";
  }

  if (Object.values(errors).length === 0) {
    return null;
  }
  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
