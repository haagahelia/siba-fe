import dao from "../ajax/dao";
import {
  requiredFieldErrorMessageFunction,
  trimAllPropertyValueStrings,
  vF_regDescription,
  vF_regName,
  vF_regNumberValue,
  vF_regTextValue,
} from "./Validate_GenericRegexps";

export async function validate(values) {
  trimAllPropertyValueStrings(values);
  const errors = {};

  let settingList = [];

  const getSettingNames = async function () {
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
      (building) => building.name.toLowerCase() === values.name.toLowerCase(),
    );
  };

  if (!values.name) {
    errors.name = requiredFieldErrorMessageFunction("Name");
  } else if (await getSettingNames()) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!vF_regName.regExp.test(values.name)) {
    errors.name = vF_regName.errorMessageFunction("Name");
  }

  if (values.description !== null && values.description.length > 16000) {
    errors.description =
      "The description must be maximum 16000 characters long";
  } else if (!vF_regDescription.regExp.test(values.description)) {
    errors.description = vF_regDescription.errorMessageFunction("Description");
  }

  if (!values.numberValue) {
    errors.numberValue = requiredFieldErrorMessageFunction("numberValue");
  } else if (Number.isNaN(values.numberValue)) {
    errors.numberValue = "The input is not a valid number";
  }

  if (values.textValue !== null && values.textValue.length > 255) {
    errors.textValue = "The textValue must be maximum 255 characters long";
  } else if (!vF_regTextValue.regExp.test(values.textValue)) {
    errors.textValue = vF_regTextValue.errorMessageFunction("textValue");
  }

  return errors;
}
