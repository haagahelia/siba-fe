export const regName = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
export const regDescription = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);

export const regTimeLengthHoursAndMinutes = new RegExp(
  /^(0*[2][0-3]|0*[1][0-9]|0*[0-9]):([0-5][0-9])$/,
); // 00:00 to 23:59

export const regNumberCountPlus = new RegExp(/^[1-9][0-9]*$/); // 1-n, 1-999999999
export const regNumberDecimalOnePlus = new RegExp(/^[0-9]*(.[0-9])?$/); // 0.1-99999999.9

export const vF_regTimeLengthHoursAndMinutes = {
  regExp: new RegExp(/^(0*[2][0-3]|0*[1][0-9]|0*[0-9]):([0-5][0-9])$/), // 00:00 to 23:59,
  hint: "HH:MM",
  errorMessageFunction: (fieldName) =>
    genericErrorMessageFunction(
      fieldName,
      "has to follow format: 00:00 to 23:59",
    ),
};

export const vF_regTimetableTime = {
  regExp: new RegExp(/^(0*[2][0-3]|0*[1][0-9]|0*[0-9]):([0-5][0-9])$/), // 00:00 to 23:59,
  hint: "HH:MM",
  errorMessageFunction: (fieldName) =>
    genericErrorMessageFunction(
      fieldName,
      "has to follow format: 00:00 to 23:59",
    ),
};

export const requiredFieldErrorMessageFunction = (fieldName) =>
  `'${fieldName}': is a required field\n`;

const genericErrorMessageFunction = (fieldName, erroMessageEnd) =>
  `'${fieldName}' ${erroMessageEnd}\n`;
