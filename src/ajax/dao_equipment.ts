import Logger from "../logger/logger";
import { Equipment, ResponseFiner } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchEquipmentData = async (): Promise<
  ResponseFiner<Equipment>
> => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
  };
  const request = new Request(`${baseUrl}/equipment/`, {
    method: "GET",
    headers: headers,
  });
  Logger.debug("Sessio n token:", localStorage.getItem("sessionToken"));
  const response = await fetch(request);

  if (response.status === 200) {
    const equipments: Equipment[] = await response.json();
    return { httpStatus: response.status, data: equipments };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

export const fetchEquipmentById = async (
  id: number,
): Promise<ResponseFiner<Equipment>> => {
  const request = new Request(`${baseUrl}/equipment/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });

  const response = await fetch(request);

  if (response.status === 200) {
    const equipments: Equipment[] = await response.json();
    return { httpStatus: response.status, data: equipments };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

export const postNewEquipment = async (
  newEquipment: Equipment,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/equipment/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEquipment),
  });
  const response = await fetch(request);
  return response.ok;
};

export const deleteSingleEquipment = async (
  equipmentId: number,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/equipment/${equipmentId}`, {
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

export const editEquipment = async (
  editedEquipment: Equipment,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/equipment`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedEquipment),
  });
  const response = await fetch(request);
  return response.ok;
};
