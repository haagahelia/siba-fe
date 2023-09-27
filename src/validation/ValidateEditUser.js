export function validate(values) {
  const errors = {};
  const { email, isAdmin, isPlanner, isStatist } = values;
  const regNumber = new RegExp(/[0-1]/);

  if (!email) {
    errors.email = "Email required";
  }
  //checks if the field is empty, but only for non 0 cases. (since 0 is used for no role)
  if (!isAdmin && isAdmin !== 0) {
    errors.isAdmin = "Admin status required";
  } else if (!regNumber.test(values.isAdmin)) {
    errors.isAdmin = "Value must be between 0 and 1";
  }

  if (!isPlanner && isPlanner !== 0) {
    errors.isPlanner = "Planner status required";
  } else if (!regNumber.test(values.isPlanner)) {
    errors.isPlanner = "Value must be between 0 and 1";
  }

  if (!isStatist && isStatist !== 0) {
    errors.isStatist = "Statist status required";
  } else if (!regNumber.test(values.isStatist)) {
    errors.isStatist = "Value must be between 0 and 1";
  }

  return errors;
}
