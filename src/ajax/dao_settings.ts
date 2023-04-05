import { Response, Settings } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchSettings = async (): Promise<Response<Settings>> => {
  const request = new Request(`${baseUrl}/setting`, {
    method: "GET",
  });

  const response = await fetch(request);
  const settings: Settings[] = await response.json();
  return { success: response.ok, data: settings };
};

// delete setting
export const deleteSettingById = async (
  settingId: number,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/setting/delete/${settingId}`, {
    method: "DELETE",
  });
  const response = await fetch(request);
  const data = await response.json();

  return data?.returnedNumberValue === 1;
};

// update setting
export const editSetting = async (
  editedSetting: Settings,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/setting/updateSetting`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedSetting),
  });
  const response = await fetch(request);
  const data = await response.json();
  return data.ok;
};

// post new setting
export const postNewSetting = async (
  newSetting: Settings,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/setting/postSetting`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSetting),
  });
  const response = await fetch(request);
  const data = await response.json();
  console.dir(`dao_se_ data:${data}`);
  return data;
};
