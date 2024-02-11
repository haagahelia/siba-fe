import { Building, ResponseFiner } from "../types";
import { create, download, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all buildings
export const fetchAllBuildings = async (): Promise<ResponseFiner<Building>> => {
  const response = await get(`${baseUrl}/building`);
  if (response.status === 200) {
    const buildings: Building[] = await response.json();
    return { httpStatus: response.status, data: buildings };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// creating new building
export const postNewBuilding = async (
  newBuilding: Building,
): Promise<boolean> => {
  const response = await create(`${baseUrl}/building`, newBuilding);
  return response.ok;
};

// creating multiple buildings
export const postNewBuildings = async (
  newBuilding: Building[],
): Promise<boolean> => {
  const response = await create(`${baseUrl}/building/multi`, newBuilding);
  return response.ok;
};

// updating building
export const editBuilding = async (
  editedBuilding: Building,
): Promise<boolean> => {
  const response = await update(`${baseUrl}/building`, editedBuilding);
  return response.ok;
};

// removing single building
export const deleteBuildingById = async (
  buildingId: number,
): Promise<boolean> => {
  const response = await remove(`${baseUrl}/building/${buildingId}`);
  return response.ok;
};

export const downloadBuildingTemplate = async (): Promise<
  ResponseFiner<Building>
> => {
  return download<Building>("building", baseUrl);
};
