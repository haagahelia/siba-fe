import dao from "../ajax/dao";
import Logger from "../logger/logger";

export async function validate(values,allocRoundId) {
  const errors = {};
  const regName = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regNumber = new RegExp(/^[0-9]+$/);
  const regTime = new RegExp(/^([0-1][0-2]):([0-5][0-9])(:[0-5][0-9])?$/);
  const regArea = new RegExp(/^[0-9]*(.[0-9]{1,2})?$/);

  let subjectList = [];

  const getSubjectNames = async function (allocRoundId) {
    const { httpStatus, data } = await dao.fetchSubjectsNames(allocRoundId);
    if (httpStatus === 200) {
      subjectList = data;
      let result;
      let id;
      let filteredList = [];
      // Here it is considered that the user does not enter
      // the name of an already existing lesson.
      // In filtering, however, it is considered / taken into account
      // that the name can be the same as the name of the lesson being edited
      subjectList.forEach((item) => {
        // Changed from map to forEach,
        // as we're not returning a new array but performing side effects
        if (values.id === item.id) {
          id = item.id;
          // Here, all teaching IDs that do not match
          // the teaching ID to be edited are filtered out
          filteredList = subjectList.filter((element) => {
            return element.id !== id;
          });
        }
      });
      // Here we compare the lessons that did not match the id of the lesson
      // to be edited and see if the user's input matches
      // the name of an already existing lesson
      return filteredList.some(
        (names) =>
          names.name.toLowerCase() === values.name.toLowerCase(),
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
  } else if (!regName.test(values.name)) {
    errors.name = "Only letters, numbers and '-' allowed";
  }
  if (!values.groupSize) {
    errors.groupSize = "Required field";
  } else if (values.groupSize <= 0) {
    errors.groupSize = "Group size cannot be 0";
  } else if (!regNumber.test(values.groupSize)) {
    errors.groupSize = "Only numbers allowed";
  }

  if (!values.groupCount) {
    errors.groupCount = "Required field";
  } else if (values.groupCount <= 0) {
    errors.groupCount = "The number of groups cannot be 0";
  } else if (!regNumber.test(values.groupCount)) {
    errors.groupCount = "Only numbers allowed";
  }

  if (!values.sessionLength) {
    errors.sessionLength = "Required field";
  } else if (!regTime.test(values.sessionLength)) {
    errors.sessionLength = "Allowed format is 00:00 or 00:00:00";
  }

  if (!values.sessionCount) {
    errors.sessionCount = "Required field";
  } else if (values.sessionCount <= 0) {
    errors.sessionCount = "The number of lessons cannot be 0";
  } else if (!regNumber.test(values.sessionCount)) {
    errors.sessionCount = "Only numbers allowed";
  }

  if (!values.area) {
    errors.area = "Required field";
  } else if (values.area <= 0) {
    errors.area = "The required quantity cannot be 0";
  } else if (!regArea.test(values.area)) {
    errors.area = "Only numbers allowed & format .00 allowed";
  }

  if (!values.programId) {
    errors.programId = "Required field";
  }
  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
