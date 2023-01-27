export function validate(values) {
  const errors = {};
  const regNumber = new RegExp(/^[0-9]+$/);

  if (!values.equipmentId) {
    errors.equipmentId = "Required field";
  }
  if (!values.priority) {
    errors.priority = "Required field";
  } else if (values.priority < 50 || values.priority > 900) {
    errors.priority = "The priority must be between 50 and 900 points";
  } else if (!regNumber.test(values.priority)) {
    errors.priority = "Only numbers allowed";
  }
  return errors;
}
