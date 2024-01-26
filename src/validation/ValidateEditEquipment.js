import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regDescription,
  vF_regName,
  vF_regNumberCountPlus,
} from "./Validate_GenericRegexps";
import { isDuplicatedEquipmentNameExceptCurrent } from "./ValidationUtilities";

export default async function ValidateEditEquipment(values) {
  trimAllPropertyValueStrings(values);
  const errors = {};
  const { id, name, priority, description } = values;

  if (!name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await isDuplicatedEquipmentNameExceptCurrent(id, name)) {
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

  if (description.length > 16000) {
    errors.description = "Description cannot exceed 16000 characters.";
  } else if (!vF_regDescription.regExp.test(description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  return errors;
}
