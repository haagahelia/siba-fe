import { Response, Equipment } from "../types";

export const fetchEquipmentData = async (): Promise<Response<Equipment>> => {
  const request = new Request(
    "http://localhost:3001/api/equipment/getEquipData",
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  const equipments: Equipment[] = await response.json();
  return { success: response.ok, data: equipments };
};
