import dao from "../ajax/dao";

export async function validate(values) {
  const errors = {};
  const regName = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regDescription = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regNumberValue = new RegExp(/^[0-9]+$/);
  const regTextValue = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);

  let settingList = [];

  const getSettingNames = async function () {
    const { data } = await dao.fetchSettings();
    settingList = data;
    let result;
    let id;
    let filteredList = [];
    // Check if user enter an existed setting name
    settingList.forEach((setting) => {
      if (values.id === setting.id) {
        id = setting.id;

        filteredList = settingList.filter((setting) => {
          return setting.id !== id;
        });
      }
    });

    result = filteredList.some(
      (building) => building.name.toLowerCase() === values.name.toLowerCase(),
    );
    return result;
  };

  if (!values.name) {
    errors.name = "Required field";
  } else if (await getSettingNames()) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!regName.test(values.name)) {
    errors.name = "Only letters, numbers and '-' allowed";
  }

  if (values.description !== null && values.description.length > 16000) {
    errors.description =
      "The description must be maximum 16000 characters long";
  } else if (!regDescription.test(values.description)) {
    errors.description = "Only letters, numbers and '-' allowed";
  }

  if (!values.numberValue) {
    errors.numberValue = "Required field";
  } else if (values.numberValue < 0 || values.numberValue > 11) {
    errors.numberValue = "The numberValue must be between 0 and 11 points";
  } else if (!regNumberValue.test(values.numberValue)) {
    errors.numberValue = "Only numbers allowed";
  }

  if (values.textValue !== null && values.textValue.length > 255) {
    errors.textValue = "The textValue must be maximum 255 characters long";
  } else if (!regTextValue.test(values.textValue)) {
    errors.textValue = "Only letters, numbers and '-' allowed";
  }

  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
