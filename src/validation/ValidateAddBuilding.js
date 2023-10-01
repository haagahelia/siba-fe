import dao from "../ajax/dao";

export async function validate(values) {
  const errors = {};
  const regName = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regDescription = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);

  const isDuplicatedName = async function () {
    let buildingList = [];
    const { data } = await dao.fetchAllBuildings();
    buildingList = data;
    // Check if user enter an existed building name
    const result = buildingList.some(
      (building) => building.name.toLowerCase() === values.name.toLowerCase(),
    );

    return result;
  };

  if (!values.name) {
    errors.name = "Required field";
  } else if (await isDuplicatedName()) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!regName.test(values.name)) {
    errors.name = "Only letters, numbers and '-' allowed";
  }

  if (values.description.length < 2 || values.description.length > 255) {
    errors.description = "The description must be 2-255 characters long";
  } else if (!regDescription.test(values.description)) {
    errors.description = "Only letters, numbers and '-' allowed";
  }

  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
