import dao from "../ajax/dao";
import {
  requiredFieldErrorMessageFunction,
  vF_regDescription,
  vF_regName,
  vF_regNumberCountPlus,
  vF_regNumberDecimalOnePlus,
  vF_regTimetableTime,
} from "./Validate_GenericRegexps";

export default async function ValidateAddSpace(values) {
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

  const isDuplicatedSpaceNameAndBuildingName = async () => {
    let spaceList = [];
    const { data } = await dao.fetchSpaceNamesInBuilding();
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
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await isDuplicatedSpaceNameAndBuildingName()) {
    errors.name = "'Name': already exists in the building\n";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "'Name': should be between 2 and 255 characters.\n";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (!area) {
    errors.area = requiredFieldErrorMessageFunction("Area");
  } else if (values.area <= 0) {
    errors.area = "'Area': cannot be less than 0\n";
  } else if (!vF_regNumberDecimalOnePlus.regExp.test(values.area)) {
    errors.area = vF_regNumberDecimalOnePlus.errorMessageFunction("Area");
  }

  if (info.length > 16000) {
    errors.info = "'Info': maximum 16000 characters long\n";
  } else if (!vF_regDescription.regExp.test(values.info)) {
    errors.info = vF_regDescription.errorMessageFunction("Info");
  }

  if (!personLimit) {
    errors.personLimit = requiredFieldErrorMessageFunction("Person limit");
  } else if (personLimit <= 0) {
    errors.personLimit = "'Person limit': cannot be less than 0\n";
  } else if (!vF_regNumberCountPlus.regExp.test(personLimit)) {
    errors.personLimit =
      vF_regNumberCountPlus.errorMessageFunction("Person limit");
  }

  if (!availableFrom) {
    errors.availableFrom = requiredFieldErrorMessageFunction("Available from");
  } else if (!vF_regTimetableTime.regExp.test(availableFrom)) {
    errors.availableFrom =
      vF_regTimetableTime.errorMessageFunction("Available from");
  }

  if (!availableTo) {
    errors.availableTo = requiredFieldErrorMessageFunction("Available to");
  } else if (!vF_regTimetableTime.regExp.test(availableTo)) {
    errors.availableTo =
      vF_regTimetableTime.errorMessageFunction("Available to");
  }

  if (availableFrom && availableTo && availableFrom === availableTo) {
    errors.availableTo =
      "'Available to' cannot be the same as 'Available from'";
  }

  if (!classesFrom) {
    errors.classesFrom = requiredFieldErrorMessageFunction("Classes from");
  } else if (!vF_regTimetableTime.regExp.test(classesFrom)) {
    errors.classesFrom =
      vF_regTimetableTime.errorMessageFunction("Classes from");
  }

  if (!classesTo) {
    errors.classesTo = requiredFieldErrorMessageFunction("Classes to");
  } else if (!vF_regTimetableTime.regExp.test(classesTo)) {
    errors.classesTo = vF_regTimetableTime.errorMessageFunction("Classes to");
  }

  if (classesFrom && classesTo && classesFrom === classesTo) {
    errors.classesTo = "'Classes to' cannot be the same as 'Classes from'";
  }

  if (inUse === undefined && inUse === null) {
    errors.inUse = requiredFieldErrorMessageFunction("In use?");
  } else if (!["0", "1", 0, 1].includes(inUse)) {
    //!["yes", "no", "0", "1", 0, 1, false, true].includes(inUse)) {
    errors.inUse = "'In use' value must be either: '0' or '1' \n";
  }

  // Additional validation rules can be added as needed for other fields.
  if (Object.values(errors).length === 0) {
    return null;
  }

  return errors;
}
