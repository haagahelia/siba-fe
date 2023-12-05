import dao from "../ajax/dao";

export default async function ValidateAddSpace(values) {
  console.log("ValidateAddSpace.js called")
  const regName = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regInfo = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regNumber = new RegExp(/^[0-9]+$/);
  const regTime = new RegExp(/^([0-1][0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/);
  const regArea = new RegExp(/^[0-9]*(.[0-9]{1,2})?$/);

  const errors = {};
  const {
    name,
    area,
    info,
    personLimit,
    buildingName,
    availableFrom,
    availableTo,
    classesFrom,
    classesTo,
    inUse,
  } = values;

  const isDuplicatedSpaceNameAndBuildingName = async function () {
    let spaceList = [];
    const { data } = await dao.fetchSpacesNamesInBuilding();
    spaceList = data;
    // Check if user enter an existed space name in the same building
    const result = spaceList.some((spaceName) => {
      return (
        spaceName.name.toLowerCase() === `${name}-${buildingName}`.toLowerCase()
      );
    });

    return result;
  };

  if (!name) {
    errors.name = "'Name': is a required field\n";
  } else if (await isDuplicatedSpaceNameAndBuildingName()) {
    errors.name = "'Name': already exists in the building\n";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "'Name': should be between 2 and 255 characters.\n";
  } else if (!regName.test(values.name)) {
    errors.name = "'Name': only letters, numbers and '-' are allowed\n";
  }

  if (!area) {
    errors.area = "'Area': is a required field\n";
  } else if (values.area <= 0) {
    errors.area = "'Area': cannot be less than 0\n";
  } else if (!regArea.test(values.area)) {
    errors.area = "'Area': only numbers with a maximum of two decimal places are allowed\n";
  }

  if (info.length > 16000) {
    errors.info = "'Info': maximum 16000 characters long\n";
  } else if (!regInfo.test(values.info)) {
    errors.info = "'Info': only letters, numbers and '-' are allowed\n";
  }

  if (!personLimit) {
    errors.personLimit = "'Person limit': is a required field\n";
  } else if (personLimit <= 0) {
    errors.personLimit = "'Person limit': cannot be less than 0\n";
  } else if (!regNumber.test(personLimit)) {
    errors.personLimit = "'Person limit': only numbers allowed\n";
  }

  if (!availableFrom) {
    errors.availableFrom = "'Available from': is a required field\n";
  } else if (!regTime.test(availableFrom)) {
    errors.availableFrom = "'Available from': allowed format is 00:00 or 00:00:00\n";
  }

  if (!availableTo) {
    errors.availableTo = "'Available to': is a required field\n";
  } else if (!regTime.test(availableTo)) {
    errors.availableTo = "'Available to': allowed format is 00:00 or 00:00:00\n";
  }

  if (!classesFrom) {
    errors.classesFrom = "'Classes from': is a required field\n";
  } else if (!regTime.test(classesFrom)) {
    errors.classesFrom = "'Classes from': allowed format is 00:00 or 00:00:00\n";
  }

  if (!classesTo) {
    errors.classesTo = "'Classes to': is a required field\n";
  } else if (!regTime.test(classesTo)) {
    errors.classesTo = "Classes to': allowed format is 00:00 or 00:00:00\n";
  }

  if (inUse === undefined && inUse === null) {
    errors.inUse = "'In use?' is a required field\n";
  } else if (!["yes", "no", "0", "1", 0, 1, false, true].includes(inUse)) {
    errors.inUse = "'In use' value must be either: yes/no/'0'/'1'\n";
  }

  // Additional validation rules can be added as needed for other fields.
  if (Object.values(errors).length === 0) {
    return null;
  }

  return errors;
}
