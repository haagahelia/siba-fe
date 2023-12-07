export function validate(values) {
  const errors = {};
  const { isAdmin, isPlanner, isStatist } = values;

  if (isAdmin === 0 && isPlanner === 0 && isStatist === 0) {
    errors.general = "Please select at least one role.";
    alert(errors.general);
  }

  return errors;
}
