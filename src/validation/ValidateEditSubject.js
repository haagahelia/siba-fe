import dao from "../ajax/dao";
import Logger from "../logger/logger";
import {
  requiredFieldErrorMessageFunction,
  vF_regName,
  vF_regNumberCountPlus,
  vF_regNumberDecimalOnePlus,
  vF_regTimeLengthHoursAndMinutes,
} from "./Validate_GenericRegexps";

export async function validate(values, allocRoundId) {
  const errors = {};

  const getSubjectNames = async function (allocRoundId) {
    const { httpStatus, data } = await dao.fetchSubjectNames(allocRoundId);
    if (httpStatus === 200) {
      const subjectList = data;
      //let result;
      let id;
      let filteredList = [];
      // Here it is considered that the user does not enter
      // the name of an already existing lesson.
      // In filtering, however, it is considered / taken into account
      // that the name can be the same as the name of the lesson being edited
      for (const item of subjectList) {
        if (values.id === item.id) {
          id = item.id;
          filteredList = subjectList.filter((element) => {
            return element.id !== id;
          });
        }
      }
      // Here we compare the lessons that did not match the id of the lesson
      // to be edited and see if the user's input matches
      // the name of an already existing lesson
      return filteredList.some(
        (names) => names.name.toLowerCase() === values.name.toLowerCase(),
      );
    } else {
      Logger.error(`getSubjectNames failed, http status code: ${httpStatus}`);
    }
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await getSubjectNames(allocRoundId)) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }
  if (!values.groupSize) {
    errors.groupSize = requiredFieldErrorMessageFunction("Group size");
  } else if (values.groupSize <= 0) {
    errors.groupSize = "Group size cannot be 0";
  } else if (!vF_regNumberCountPlus.regExp.test(values.groupSize)) {
    errors.groupSize = vF_regNumberCountPlus.errorMessageFunction("Group size");
  }

  if (!values.groupCount) {
    errors.groupCount = requiredFieldErrorMessageFunction("Group count");
  } else if (values.groupCount <= 0) {
    errors.groupCount = "The number of groups cannot be 0";
  } else if (!vF_regNumberCountPlus.regExp.test(values.groupCount)) {
    errors.groupCount =
      vF_regNumberCountPlus.errorMessageFunction("Group count");
  }

  if (!values.sessionLength) {
    errors.sessionLength = requiredFieldErrorMessageFunction("Session length");
  } else {
    const sessionLengthParts = values.sessionLength
      .split(":")
      .map((part) => parseInt(part));
    const sessionHours = sessionLengthParts[0];
    const sessionMinutes = sessionLengthParts[1];

    if (sessionHours === 0 && sessionMinutes < 15) {
      errors.sessionLength = "Session length must be at least 15 minutes";
    } else if (
      !vF_regTimeLengthHoursAndMinutes.regExp.test(values.sessionLength)
    ) {
      errors.sessionLength =
        vF_regTimeLengthHoursAndMinutes.errorMessageFunction("Session length");
    }
  }

  if (!values.sessionCount) {
    errors.sessionCount = requiredFieldErrorMessageFunction("Session count");
  } else if (values.sessionCount <= 0) {
    errors.sessionCount = "The number of sessions per week cannot be 0";
  } else if (!vF_regNumberCountPlus.regExp.test(values.sessionCount)) {
    errors.sessionCount =
      vF_regNumberCountPlus.errorMessageFunction("Session count");
  }

  if (!values.area) {
    errors.area = requiredFieldErrorMessageFunction("Area");
  } else if (values.area <= 0) {
    errors.area = "The required area cannot be 0";
  } else if (!vF_regNumberDecimalOnePlus.regExp.test(values.area)) {
    errors.area = vF_regNumberDecimalOnePlus.errorMessageFunction("Area");
  }

  if (!values.programId) {
    errors.programId = requiredFieldErrorMessageFunction("Program id");
  }
  return errors;
}
