import { Response, SpaceEquipment } from "../types";
import { create, get } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching SpaceEquipment by spaceId
export const fetchEquipmentBySpaceId = async (
  id: number,
): Promise<Response<SpaceEquipment>> => {
  const response = await get(`${baseUrl}/spaceequipment/getEquipment/${id}`);
  const spaceEquipments: SpaceEquipment[] = await response.json();
  return { success: response.ok, data: spaceEquipments };
};

// creating new SpaceEquipment
export const postNewSpaceEquipment = async (
  newSpaceEquipment: SpaceEquipment,
): Promise<boolean> => {
  const response = await create(
    `${baseUrl}/spaceequipment/post`,
    newSpaceEquipment,
  );
  const data = await response.json();
  return data;
};
