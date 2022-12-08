export function validate(values) {
  const errors = {};
  const regNumber = new RegExp(/^[0-9]+$/);

  if (!values.equipmentId) {
    errors.equipmentId = "Pakollinen kenttä";
  }
  if (!values.priority) {
    errors.priority = "Pakollinen kenttä";
  } else if (values.priority < 50 || values.priority > 900) {
    errors.priority = "Prioriteetin pitää olla 50 - 900 pisteen välillä";
  } else if (!regNumber.test(values.priority)) {
    errors.priority = "Vain numerot sallittu";
  }
  return errors;
}
