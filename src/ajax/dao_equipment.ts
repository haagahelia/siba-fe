import { Response, Equipment } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchEquipmentData = async (): Promise<Response<Equipment>> => {
  const request = new Request(`${baseUrl}/equipment/`, {
    method: "GET",
  });
  console.log("Starting to fetch equipments:");
  const response = await fetch(request);
  const equipments: Equipment[] = await response.json();
  console.log(`Equipments:${equipments}`);
  console.log(`Equipments[0]:${equipments[0].id}-${equipments[0].name}`);
  return { success: response.ok, data: equipments };
};

export const postNewEquipment = async (
  newEquipment: Equipment,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/equipment/`, {
    method: "POST",
    headers: {
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
  });

  const response = await fetch(request);
  const data = await response.json();

  return data?.returnedNumberValue === 1;
};

export const editEquipment = async (
  editedEquipment: Equipment,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/equipment/updateEquip`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedEquipment),
  });
  const response = await fetch(request);
  return response.ok;
};
