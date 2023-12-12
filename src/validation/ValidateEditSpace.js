import dao from "../ajax/dao";
import Logger from "../logger/logger";
import {
  regDescription,
  regName,
  regNumberCountPlus,
  regNumberDecimalOnePlus,
  requiredFieldErrorMessageFunction,
  vF_regTimetableTime,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  const errors = {};
  const {
    name,
    area,
    info,
    personLimit,
    buildingId,
    availableFrom,
    availableTo,
    classesFrom,
    classesTo,
    inUse,
  } = values;

  const getSpaceNames = async function () {
    try {
      const { httpStatus, data } = await dao.fetchSpaceNames();
      if (httpStatus === 200) {
        const spaceList = data;
        const id = values.id;
        const filteredList = spaceList.filter((element) => element.id !== id);
        return filteredList.some(
          (names) => names.name.toLowerCase() === name.toLowerCase(),
        );
      } else {
        Logger.error(`getSpaceNames failed, http status code: ${httpStatus}`);
      }
    } catch (error) {
      Logger.error(`Error while fetching space names: ${error}`);
    }
    return false; // Return false in case of errors
  };

  if (!name) {
    errors.name = "Required field";
  } else if (await getSpaceNames()) {
    errors.name = "The name already exists";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!regName.test(name)) {
    errors.name = "Only letters, numbers, and '-' allowed";
  }

  if (!area) {
    errors.area = "Required field";
  } else if (area <= 0) {
    errors.area = "The required quantity cannot be 0";
  } else if (!regNumberDecimalOnePlus.test(area)) {
    errors.area = "Only numbers allowed & format .00 allowed";
  }

  if (info.length > 16000) {
    errors.info = "'Info': maximum 16000 characters long\n";
  } else if (!regDescription.test(info)) {
    errors.info = "'Info': only letters, numbers and '-' are allowed\n";
  }

  if (!values.personLimit) {
    errors.personLimit = "'Person limit': is a required field\n";
  } else if (personLimit <= 0) {
    errors.personLimit = "'Person limit': cannot be less than 0\n";
  } else if (!regNumberCountPlus.test(personLimit)) {
    errors.personLimit = "'Person limit': only numbers allowed\n";
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

  if (inUse === undefined && inUse === null) {
    errors.inUse = "'In use?' is a required field\n";
  } else if (!["yes", "no", "0", "1", 0, 1, false, true].includes(inUse)) {
    errors.inUse = "'In use' value must be either: yes/no/'0'/'1'\n";
  }

  // Add more space-related validation here as needed

  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
