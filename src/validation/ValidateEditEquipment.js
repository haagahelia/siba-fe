import { vF_regDescription, vF_regName } from "./Validate_GenericRegexps";

export default function ValidateEditEquipment(values) {
  const errors = {};
  const { name, priority, description } = values;

  if (!name) {
    errors.name = "Equipment name required";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "Name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (!priority) {
    errors.priority = "Priority required";
  } else if (priority < 0) {
    errors.priority = "Priority must be bigger than zero";
  }

  if (!vF_regDescription.regExp.test(description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  return errors;
}
