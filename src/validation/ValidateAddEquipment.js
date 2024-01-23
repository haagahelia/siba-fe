import dao from "../ajax/dao";
import {
  requiredFieldErrorMessageFunction,
  vF_regDescription,
} from "./Validate_GenericRegexps";

export default async function ValidateAddEquipment(values) {
  const errors = {};
  let { name, priority, description, isMovable } = values;
  name = name.trim();
  description = description.trim();

  const isDuplicatedName = async function () {
    let equipmentList = [];
    const { data } = await dao.fetchEquipmentData();
    equipmentList = data;
    // Check if user enter an existed building name
    const result = equipmentList.some(
      (equipment) => equipment.name.toLowerCase() === name.toLowerCase(),
    );

    return result;
  };

  if (!name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await isDuplicatedName()) {
    errors.name = "The name already exists";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "Equipment name needs to be between 2 and 255 characters.";
  }

  if (!priority) {
    errors.priority = requiredFieldErrorMessageFunction("Priority");
  } else if (priority < 0) {
    errors.priority = "Priority cannot be negative.";
  }

  if (!description) {
    errors.description = requiredFieldErrorMessageFunction("Description");
  } else if (description.length > 16000) {
    errors.description = "Description cannot exceed 16000 characters.";
  } else if (!vF_regDescription.regExp.test(description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  if (
    isMovable === undefined ||
    isMovable === null ||
    isMovable === -1 ||
    isMovable === ""
  ) {
    errors.isMovable = requiredFieldErrorMessageFunction("is Movable marking");
  } else if (!["0", "1", 0, 1].includes(isMovable)) {
    errors.isMovable =
      "isMovable needs to be 1 = movable equipment. 0 = unmovable equipment.";
  }

  if (Object.values(errors).length === 0) {
    return null;
  }
  console.log(errors);
  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
