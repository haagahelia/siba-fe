import dao from "../ajax/dao";
import Logger from "../logger/logger";
import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regName,
  vF_regNumberCountPlus,
  vF_regNumberDecimalOnePlus,
  vF_regTimeLengthHoursAndMinutes,
} from "./Validate_GenericRegexps";

export async function validate(values, allocRoundId) {
  trimAllPropertyValueStrings(values);
  const errors = {};

  let subjectList = [];

  const getSubjectNames = async (allocRoundId) => {
    const { httpStatus, data } = await dao.fetchSubjectNames(allocRoundId);
    if (httpStatus === 200) {
      subjectList = data;
      // Here it is considered that the user does not enter
      // the name of an already existing lesson.
      const result = subjectList.some((program) => {
        return (
          program.name
            .trim()
            .toLowerCase()
            .localeCompare(values.name.trim().toLowerCase()) === 0
        );
      });
      return result;
    } else {
      Logger.error(`getSubjectNames failed, http status code: ${httpStatus}`);
    }
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await getSubjectNames(allocRoundId)) {
    errors.name = `This imported name already exists: ${values.name}`;
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
    const sessionLengthMinutes = parseInt(values.sessionLength.split(":")[1]);
    const sessionLengthHours = parseInt(values.sessionLength.split(":")[0]);

    if (sessionLengthHours === 0 && sessionLengthMinutes < 15) {
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

  if (values.area === undefined || values.area === null || values.area === "") {
    errors.area = requiredFieldErrorMessageFunction("Area");
  } else if (values.area < 0) {
    errors.area = "The required area cannot be less than 0";
  } else if (!vF_regNumberDecimalOnePlus.regExp.test(values.area)) {
    errors.area = vF_regNumberDecimalOnePlus.errorMessageFunction("Area");
  }

  if (!values.programId) {
    errors.programId = requiredFieldErrorMessageFunction("Program");
  }
  return errors;
}
