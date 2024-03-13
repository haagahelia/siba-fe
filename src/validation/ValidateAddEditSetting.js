import dao from "../ajax/dao";
import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regDescription,
  vF_regNumberValue,
  vF_regTextValue,
  vF_regVariable,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  trimAllPropertyValueStrings(values);
  const errors = {};

  let settingList = [];

  const getSettingVariables = async () => {
    const { data } = await dao.fetchSettings();
    settingList = data;
    let id;
    let filteredList = [];
    // Check if user enter an existed setting name
    for (const setting of settingList) {
      if (values.id === setting.id) {
        id = setting.id;

        filteredList = settingList.filter((item) => item.id !== id);
      }
    }

    return filteredList.some(
      (building) =>
        building.name.toLowerCase() === values.variable.toLowerCase(),
    );
  };

  if (!values.variable) {
    errors.variable = requiredFieldErrorMessageFunction("Variable");
  } else if (await getSettingVariables()) {
    errors.variable = "The variable already exists";
  } else if (values.variable.length < 2 || values.variable.length > 255) {
    errors.variable = "The variable must be 2-255 characters long";
  } else if (!vF_regVariable.regExp.test(values.variable)) {
    errors.variable = vF_regVariable.errorMessageFunction("Variable");
  }

  if (!values.description) {
    errors.description = requiredFieldErrorMessageFunction("Description");
  } else if (values.description.length > 16000) {
    errors.description =
      "The description must be maximum 16000 characters long";
  } else if (!vF_regDescription.regExp.test(values.description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  if (
    values.numberValue !== undefined &&
    values.numberValue !== null &&
    values.numberValue !== "" &&
    !/^(-?\d+)$/.test(values.numberValue)
  ) {
    errors.numberValue = "The input is not a valid number";
  }

  if (values.textValue !== null && values.textValue.length > 255) {
    errors.textValue = "The textValue must be maximum 255 characters long";
  } else if (!vF_regTextValue.regExp.test(values.textValue)) {
    errors.textValue = vF_regTextValue.errorMessageFunction("textValue");
  }

  return errors;
}
