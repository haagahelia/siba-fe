import { ResponseFiner, Settings } from "../types";
import { create, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all settings
export const fetchSettings = async (): Promise<ResponseFiner<Settings>> => {
  const response = await get(`${baseUrl}/setting`);
  if (response.status === 200) {
    const settings: Settings[] = await response.json();
    return { httpStatus: response.status, data: settings };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// post new setting
export const postNewSetting = async (
  newSetting: Settings,
): Promise<boolean> => {
  const response = await create(`${baseUrl}/setting`, newSetting);
  if (response.status === 403) {
    return false;
  }
  const data = await response.json();
  return data;
};

// update setting
export const editSetting = async (
  editedSetting: Settings,
): Promise<boolean> => {
  const response = await update(`${baseUrl}/setting/`, editedSetting);
  return response.ok;
};

// delete setting
export const deleteSettingById = async (
  settingId: number,
): Promise<boolean> => {
  const response = await remove(`${baseUrl}/setting/${settingId}`);
  return response.ok;
};
