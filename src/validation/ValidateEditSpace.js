import dao from "../ajax/dao";
import Logger from "../logger/logger";
import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regDescription,
  vF_regName,
  vF_regNumberCountPlus,
  vF_regNumberDecimalOnePlus,
  vF_regTimetableTime,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  trimAllPropertyValueStrings(values);
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

  const getSpaceNames = async () => {
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
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await getSpaceNames()) {
    errors.name = "The name already exists";
  } else if (name.length < 2 || name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (!area) {
    errors.area = requiredFieldErrorMessageFunction("Area");
  } else if (area <= 0) {
    errors.area = "The required quantity cannot be 0";
  } else if (!vF_regNumberDecimalOnePlus.regExp.test(area)) {
    errors.area = vF_regNumberDecimalOnePlus.errorMessageFunction("Area");
  }

  if (info.length > 16000) {
    errors.info = "'Info': maximum 16000 characters long\n";
  } else if (!vF_regDescription.regExp.test(info)) {
    errors.info = vF_regDescription.errorMessageFunction("Info");
  }

  if (!values.personLimit) {
    errors.personLimit = requiredFieldErrorMessageFunction("Person limit");
  } else if (personLimit <= 0) {
    errors.personLimit = "'Person limit': cannot be less than 0\n";
  } else if (!vF_regNumberCountPlus.regExp.test(personLimit)) {
    errors.personLimit =
      vF_regNumberCountPlus.errorMessageFunction("Person limit");
  }

  if (!values.availableFrom) {
    errors.availableFrom = requiredFieldErrorMessageFunction("Available from");
  } else if (!vF_regTimetableTime.regExp.test(values.availableFrom)) {
    errors.availableFrom =
      vF_regTimetableTime.errorMessageFunction("Available from");
  }

  if (!values.availableTo) {
    errors.availableTo = requiredFieldErrorMessageFunction("Available to");
  } else if (!vF_regTimetableTime.regExp.test(values.availableTo)) {
    errors.availableTo =
      vF_regTimetableTime.errorMessageFunction("Available to");
  } else if (
    values.availableFrom &&
    values.availableTo <= values.availableFrom
  ) {
    errors.availableTo = "Available to must be later than Available from";
  }

  if (!values.classesFrom) {
    errors.classesFrom = requiredFieldErrorMessageFunction("Classes from");
  } else if (!vF_regTimetableTime.regExp.test(values.classesFrom)) {
    errors.classesFrom =
      vF_regTimetableTime.errorMessageFunction("Classes from");
  } else if (values.availableTo && values.classesFrom >= values.availableTo) {
    errors.classesFrom = "Classes from must be earlier than Available to";
  } else if (
    values.availableFrom &&
    values.classesFrom < values.availableFrom
  ) {
    errors.classesFrom =
      "Classes from must be equal to or later than Available from";
  }

  if (!values.classesTo) {
    errors.classesTo = requiredFieldErrorMessageFunction("Classes to");
  } else if (!vF_regTimetableTime.regExp.test(values.classesTo)) {
    errors.classesTo = vF_regTimetableTime.errorMessageFunction("Classes to");
  } else if (values.classesFrom && values.classesTo <= values.classesFrom) {
    errors.classesTo = "Classes to must be later than Classes from";
  } else if (values.availableTo && values.classesTo > values.availableTo) {
    errors.classesTo =
      "Classes to must be equal to or earlier than Available to";
  }
  if (inUse === undefined && inUse === null) {
    errors.inUse = requiredFieldErrorMessageFunction("In use?");
  } else if (!["0", "1", 0, 1].includes(inUse)) {
    //!["yes", "no", "0", "1", 0, 1, false, true].includes(inUse)) {
    errors.inUse = "'In use' value must be either: '0' or '1' \n";
  }

  // Add more space-related validation here as needed

  return errors;
}
