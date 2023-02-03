import { Response, Equipment } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchEquipmentData = async (): Promise<Response<Equipment>> => {
  const request = new Request(`${baseUrl}/equipment/getEquipData`, {
    method: "GET",
  });
  console.log("Starting to fetch equipments:");
  const response = await fetch(request);
  const equipments: Equipment[] = await response.json();
  console.log(`Equipments:${equipments}`);
  console.log(`Equipments[0]:${equipments[0].id}-${equipments[0].name}`);
  return { success: response.ok, data: equipments };
};
