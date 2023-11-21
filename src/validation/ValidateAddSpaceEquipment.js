export function validate(values) {
  const errors = {};

  if (!values.equipmentId) {
    errors.equipmentId = "Required field";
  }
  return errors;
}
