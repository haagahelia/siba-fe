import { Response, Equipment } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchEquipmentData = async (): Promise<Response<Equipment>> => {
  const request = new Request(`${baseUrl}/equipment/getEquipData`, {
    method: "GET",
  });

  const response = await fetch(request);
  const equipments: Equipment[] = await response.json();
  return { success: response.ok, data: equipments };
};
