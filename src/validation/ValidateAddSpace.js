export default function ValidateAddSpace(values) {
  const errors = {};
  const {
    name,
    area,
    personLimit,
    availableFrom,
    availableTo,
    classesFrom,
    classesTo,
  } = values;

  if (!name) {
    errors.name = "Space name is required.";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "Space name should be between 2 and 255 characters.";
  }

  if (!area) {
    errors.area = "Area is required.";
  } else if (area <= 0) {
    errors.area = "Area should be a positive number.";
  }

  if (personLimit !== undefined && personLimit < 0) {
    errors.personLimit = "Person limit should be a non-negative number.";
  }

  if (!availableFrom) {
    errors.availableFrom = "Available from time is required.";
  }

  if (!availableTo) {
    errors.availableTo = "Available to time is required.";
  }

  if (!classesFrom) {
    errors.classesFrom = "Classes from time is required.";
  }

  if (!classesTo) {
    errors.classesTo = "Classes to time is required.";
  }

  // Additional validation rules can be added as needed for other fields.

  if (Object.values(errors).length === 0) {
    return null;
  }

  return errors;
}
