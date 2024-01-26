export const vF_regName = {
  regExp: new RegExp(/^[A-Za-zäöåÄÖÅ0-9\(\)\s\/,-]*$/),
  regExpHint:
    "A-ö big and small letters, numbers and some punctuation characters allowed",

  // Maybe these could be defined in the RegExp already, to get them checked with allowed chars?
  length: { min: 2, max: 255 },
  lengthHint: "Minimum 2 and maximum 255 characters.",

  errorMessageFunction: (fieldName) =>
    genericErrorMessageFunction(
      fieldName,
      "has wrong format. A-ö big and small letters, numbers and some punctuation characters allowed",
    ),
};

export const vF_regDescription = {
  regExp: new RegExp(/^[A-Za-zäöåÄÖÅ0-9\(\)\s\/,.:-]*$/),
  hint: "A-ö big and small letters, numbers and some punctuation characters allowed",
  errorMessageFunction: (fieldName) =>
    genericErrorMessageFunction(
      fieldName,
      "has wrong format. A-ö big and small letters, numbers and some punctuation characters allowed",
    ),
};

export const vF_regNumber = {
  regExp: new RegExp(/^[0-9]+$/),
  hint: "0-9999999",
  errorMessageFunction: (fieldName) =>
    genericErrorMessageFunction(fieldName, "has to follow format: 0-999999"),
};

// For settings
export const vF_regNumberValue = {
  regExp: new RegExp(/^[0-9]+$/),
  hint: "0-9999999",
  errorMessageFunction: (fieldName) =>
    genericErrorMessageFunction(fieldName, "has to follow format: 0-999999"),
};
export const vF_regTextValue = {
  regExp: new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s/,-]*$/),
  hint: "A-ö big and small letters, numbers and some punctuation characters allowed",
  errorMessageFunction: (fieldName) =>
    genericErrorMessageFunction(
      fieldName,
      "has wrong format. A-ö big and small letters, numbers and some punctuation characters allowed",
    ),
};

export const vF_regNumberCountPlus = {
  regExp: new RegExp(/^[1-9][0-9]*$/), // 1-n, 1-999999999
  hint: "1-9999999",
  errorMessageFunction: (fieldName) =>
    genericErrorMessageFunction(fieldName, "has to follow format: 1-999999"),
};

export const vF_regNumberDecimalOnePlus = {
  regExp: new RegExp(/^[0-9]*(.[0-9])?$/), // 0.1-99999999.9
  hint: "0.1-99999999.9",
  errorMessageFunction: (fieldName) =>
    genericErrorMessageFunction(
      fieldName,
      "has to follow format: 0.1-99999999.9",
    ),
};

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

// ------

export const requiredFieldErrorMessageFunction = (fieldName) =>
  `'${fieldName}': is a required field\n`;

const genericErrorMessageFunction = (fieldName, erroMessageEnd) =>
  `'${fieldName}' ${erroMessageEnd}\n`;

// -------

export const trimAllPropertyValueStrings = (valuesObj) => {
  const properties = Object.keys(valuesObj);

  for (const propertyName of properties) {
    if (typeof valuesObj[propertyName] === "string") {
      //  a.b is kind of same as a[b]
      valuesObj[propertyName] = valuesObj[propertyName].trim();
    }
  }
};
