export function validate(values) {
  const errors = {};

  if (!values.equipmentId) {
    errors.equipmentId = requiredFieldErrorMessageFunction("Equipment id");
  }
  return errors;
}
