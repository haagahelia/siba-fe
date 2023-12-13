import {
  requiredFieldErrorMessageFunction,
  vF_regNumber,
} from "./Validate_GenericRegexps";

export function validate(values) {
  const errors = {};

  if (!values.equipmentId) {
    errors.equipmentId = requiredFieldErrorMessageFunction("Equipment id");
  }
  if (!values.priority) {
    errors.priority = requiredFieldErrorMessageFunction("Priority");
  } else if (values.priority < 50 || values.priority > 900) {
    errors.priority = "The priority must be between 50 and 900 points";
  } else if (!vF_regNumber.regExp.test(values.priority)) {
    errors.priority = vF_regNumber.errorMessageFunction("Priority");
  }
  return errors;
}
