import { vF_regName } from "./Validate_GenericRegexps";

export default function ValidateEditEquipment(values) {
  const errors = {};
  const { name, priority, description } = values;
  const regDescription = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s\\"?.,:-]*$/);

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

  if (!regDescription.test(description)) {
    errors.description = "Invalid characters in the description";
  }

  return errors;
}
