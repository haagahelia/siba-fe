import { ResponseFiner, Settings } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchSettings = async (): Promise<ResponseFiner<Settings>> => {
  const request = new Request(`${baseUrl}/setting`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);

  if (response.status === 200) {
    const settings: Settings[] = await response.json();
    return { httpStatus: response.status, data: settings };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// delete setting
export const deleteSettingById = async (
  settingId: number,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/setting/${settingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });

  const response = await fetch(request);
  if (response.status === 403) {
    return false;
  }
  const data = await response.json();

  return data?.returnedNumberValue === 1;
};

// update setting
export const editSetting = async (
  editedSetting: Settings,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/setting/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedSetting),
  });
  const response = await fetch(request);
  if (response.status === 403) {
    return false;
  }

  const data = await response.json();
  return data.ok;
};

// post new setting
export const postNewSetting = async (
  newSetting: Settings,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/setting/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSetting),
  });
  const response = await fetch(request);
  if (response.status === 403) {
    return false;
  }

  const data = await response.json();
  console.dir(`dao_se_ data:${data}`);
  return data;
};
