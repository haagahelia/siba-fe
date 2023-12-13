import dao from "../ajax/dao";
import Logger from "../logger/logger";
import {
  regNumberCountPlus,
  regNumberDecimalOnePlus,
  regTimeLengthHoursAndMinutes,
  vF_regName,
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
    errors.name = "Required field";
  } else if (await getSubjectNames(allocRoundId)) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }
  if (!values.groupSize) {
    errors.groupSize = "Required field";
  } else if (values.groupSize <= 0) {
    errors.groupSize = "Group size cannot be 0";
  } else if (!regNumberCountPlus.test(values.groupSize)) {
    errors.groupSize = "Only numbers allowed";
  }

  if (!values.groupCount) {
    errors.groupCount = "Required field";
  } else if (values.groupCount <= 0) {
    errors.groupCount = "The number of groups cannot be 0";
  } else if (!regNumberCountPlus.test(values.groupCount)) {
    errors.groupCount = "Only numbers allowed";
  }

  if (!values.sessionLength) {
    errors.sessionLength = "Required field";
  } else if (!regTimeLengthHoursAndMinutes.test(values.sessionLength)) {
    errors.sessionLength = "Allowed format is 00:00";
  }

  if (!values.sessionCount) {
    errors.sessionCount = "Required field";
  } else if (values.sessionCount <= 0) {
    errors.sessionCount = "The number of sessions per week cannot be 0";
  } else if (!regNumberCountPlus.test(values.sessionCount)) {
    errors.sessionCount = "Only numbers allowed";
  }

  if (!values.area) {
    errors.area = "Required field";
  } else if (values.area <= 0) {
    errors.area = "The required area cannot be 0";
  } else if (!regNumberDecimalOnePlus.test(values.area)) {
    errors.area = "Only numbers and . allowed. Give value from 0.1 to 9999.9 ";
  }

  if (!values.programId) {
    errors.programId = "Required field";
  }
  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
