import { Building, Response } from "../types";
import { create, get, remove, update } from "./request";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

// fetching all buildings
export const fetchAllBuildings = async (): Promise<Response<Building>> => {
  const response = await get(`${baseUrl}/building`);
  const buildings: Building[] = await response.json();
  return { success: response.ok, data: buildings };
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
  if (response.status === 403) {
    return false;
  }
  const data = await response.json();
  return data?.returnedNumberValue === 1;
};

// removing single building
export const deleteBuildingById = async (
  buildingId: number,
): Promise<boolean> => {
  const response = await remove(`${baseUrl}/building/${buildingId}`);
  if (response.status === 403) {
    return false;
  }
  const data = await response.json();
  return data?.returnedNumberValue === 1;
};
