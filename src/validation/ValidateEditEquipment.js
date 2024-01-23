import dao from "../ajax/dao";
import {
  requiredFieldErrorMessageFunction,
  vF_regDescription,
  vF_regName,
  vF_regNumberCountPlus,
} from "./Validate_GenericRegexps";

export default async function ValidateEditEquipment(values) {
  const errors = {};
  let { name, priority, description } = values;
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
    errors.name = "Name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (!priority) {
    errors.priority = requiredFieldErrorMessageFunction("Priority");
  } else if (priority < 1) {
    errors.priority = vF_regNumberCountPlus.errorMessageFunction("Priority");
  }

  if (!description) {
    errors.description = requiredFieldErrorMessageFunction("Description");
  } else if (description.length > 16000) {
    errors.description = "Description cannot exceed 16000 characters.";
  } else if (!vF_regDescription.regExp.test(description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  return errors;
}
