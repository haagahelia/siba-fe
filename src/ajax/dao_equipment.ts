import { Response, Equipment } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchEquipmentData = async (): Promise<Response<Equipment>> => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
  };
  const request = new Request(`${baseUrl}/equipment/`, {
    method: "GET",
    headers: headers,
  });
  const response = await fetch(request);
  const equipments: Equipment[] = await response.json();
  return { success: response.ok, data: equipments };
};

export const fetchEquipmentById = async (
  id: number,
): Promise<Response<Equipment>> => {
  const request = new Request(`${baseUrl}/equipment/${id}`, {
    method: "GET",
  });

  const response = await fetch(request);
  const singleEquipment: Equipment[] = await response.json();
  return { success: response.ok, data: singleEquipment };
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
