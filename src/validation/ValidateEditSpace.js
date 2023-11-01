import dao from "../ajax/dao";
import Logger from "../logger/logger";

export async function validate(values) {
  const errors = {};
  const regName = new RegExp(/^[A-Za-zäöåÄÖÅ0-9\s-]*$/);
  const regNumber = new RegExp(/^[0-9]+$/);
  const regTime = new RegExp(/^([0-1][0-2]):([0-5][0-9])(:[0-5][0-9])?$/);
  const regArea = new RegExp(/^[0-9]*(.[0-9]{1,2})?$/);

  const getSpaceNames = async function () {
    try {
      const { httpStatus, data } = await dao.fetchSpaceNames();
      if (httpStatus === 200) {
        const spaceList = data;
        const id = values.id;
        const filteredList = spaceList.filter((element) => element.id !== id);
        return filteredList.some(
          (names) => names.name.toLowerCase() === values.name.toLowerCase(),
        );
      } else {
        Logger.error(`getSpaceNames failed, http status code: ${httpStatus}`);
      }
    } catch (error) {
      Logger.error(`Error while fetching space names: ${error}`);
    }
    return false; // Return false in case of errors
  };

  if (!values.name) {
    errors.name = "Required field";
  } else if (await getSpaceNames()) {
    errors.name = "The name already exists";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "The name must be 2-255 characters long";
  } else if (!regName.test(values.name)) {
    errors.name = "Only letters, numbers, and '-' allowed";
  }

  if (!values.area) {
    errors.area = "Required field";
  } else if (values.area <= 0) {
    errors.area = "The required quantity cannot be 0";
  } else if (!regArea.test(values.area)) {
    errors.area = "Only numbers allowed & format .00 allowed";
  }

  // Add more space-related validation here as needed

  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
