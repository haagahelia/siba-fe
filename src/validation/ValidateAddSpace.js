import dao from "../ajax/dao";

export default async function ValidateAddSpace(values) {
  const regName = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regInfo = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regNumber = new RegExp(/^[0-9]+$/);
  //const regTime = new RegExp(/^([0-1][0-2]):([0-5][0-9])(:[0-5][0-9])?$/);
  const regTime = new RegExp(/^([01][0-9]|2[0-3])([:.])([0-5][0-9])(([:.])([0-5][0-9]))?$/);
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
    errors.name = "Space name is required.";
  } else if (await isDuplicatedSpaceNameAndBuildingName()) {
    errors.name = "The space name already exists in the building";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "Space name should be between 2 and 255 characters.";
  } else if (!regName.test(values.name)) {
    errors.name = "Only letters, numbers and '-' allowed";
  }

  if (!area) {
    errors.area = "Required field area";
  } else if (values.area <= 0) {
    errors.area = "The required quantity cannot be less than 0";
  } else if (!regArea.test(values.area)) {
    errors.area = "Only numbers allowed & format .00 allowed";
  }

  if (info.length > 16000) {
    errors.info = "The space info must be at maximum 16000 characters long";
  } else if (!regInfo.test(values.info)) {
    errors.info = "Only letters, numbers and '-' allowed";
  }

  if (!personLimit) {
    errors.personLimit = "Required field person limit";
  } else if (personLimit <= 0) {
    errors.personLimit = "Person limit cannot be less than 0";
  } else if (!regNumber.test(personLimit)) {
    errors.personLimit = "Only numbers allowed";
  }

  if (!availableFrom) {
    errors.availableFrom = "Required field available from";
  } else if (!regTime.test(availableFrom)) {
    errors.availableFrom = "\"Available From\": Allowed format is 00:00 or 00:00:00\n";
  }

  if (!availableTo) {
    errors.availableTo = "Required field available to";
  } else if (!regTime.test(availableTo)) {
    errors.availableTo = "\"Available To\": Allowed format is 00:00 or 00:00:00\n";
  }

  if (!classesFrom) {
    errors.classesFrom = "Required field classes from";
  } else if (!regTime.test(classesFrom)) {
    errors.classesFrom = "\"Classes From\": Allowed format is 00:00 or 00:00:00\n";
  }

  if (!classesTo) {
    errors.classesTo = "Required field classes to";
  } else if (!regTime.test(classesTo)) {
    errors.classesTo = "\"Classes To\": Allowed format is 00:00 or 00:00:00\n";
  }

  if (inUse === undefined && inUse === null) {
    errors.inUse = "Required filed in use";
  } else if (!["yes", "no", "0", "1", 0, 1, false, true].includes(inUse)) {
    errors.inUse = "Required filed in use as value yes/no/'0'/'1'";
  }

  // Additional validation rules can be added as needed for other fields.
  if (Object.values(errors).length === 0) {
    return null;
  }

  return errors;
}
