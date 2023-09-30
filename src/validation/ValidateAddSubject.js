import dao from "../ajax/dao";
import Logger from "../logger/logger";

export async function validate(values) {
  const errors = {};
  const regName = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regNumber = new RegExp(/^[0-9]+$/);
  const regTime = new RegExp(/^([0-1][0-2]):([0-5][0-9])(:[0-5][0-9])?$/);
  const regArea = new RegExp(/^[0-9]*(.[0-9]{1,2})?$/);

  let subjectList = [];

  const getSubjectNames = async function () {
    const { httpStatus, data } = await dao.fetchSubjectsNames();
    if (httpStatus === 200) {
      subjectList = data;
      // Here it is considered that the user does not enter
      // the name of an already existing lesson.
      let result = subjectList.some(
        (names) => names.name.toLowerCase() === values.name.toLowerCase(),
      );
      return result;
    } else {
      Logger.error(`getSubjectNames failed, http status code: ${httpStatus}`);
    }
  };

  if (!values.name) {
    errors.name = "Required field";
  } else if (await getSubjectNames()) {
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
