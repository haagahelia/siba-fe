import dao from "../ajax/dao";

export default async function ValidateAddEquipment(values) {
  const errors = {};
  const { name, priority, description, isMovable } = values;
  const regDescription = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s\\"?.,:-]*$/);

  const isDuplicatedName = async function () {
    let equipmentList = [];
    const { data } = await dao.fetchEquipmentData();
    equipmentList = data;
    // Check if user enter an existed building name
    const result = equipmentList.some(
      (equipment) => equipment.name.toLowerCase() === name.toLowerCase(),
    );

    return result;
  };

  if (!name) {
    errors.name = "Equipment name required.";
  } else if (await isDuplicatedName()) {
    errors.name = "The name already exists";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "Equipment needs to be between 2 and 255 characters.";
  }

  if (!priority) {
    errors.priority = "Priority value required.";
  } else if (priority < 0) {
    errors.priority = "Priority needs to be bigger than 0.";
  }

  if (!description) {
    errors.description = "Description name required.";
  } else if (description.length < 2 || description.length > 255) {
    errors.description = "Description needs to be between 2 and 255 characters";
  } else if (!regDescription.test(description)) {
    errors.description = "Invalid characters in description.";
  }

  if (isMovable === undefined || isMovable === null) {
    errors.isMovable = "isMovable value required.";
  } else if (isMovable !== "1" && isMovable !== "0") {
    errors.isMovable =
      "isMovable needs to be 1 = movable equipment. 0 = unmovable equipment.";
  }

  if (Object.values(errors).length === 0) {
    return null;
  }
  console.log(errors);
  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
