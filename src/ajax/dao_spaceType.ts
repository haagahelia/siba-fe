import { ResponseFiner, SpaceType } from "../types";
import { create, download, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all spaceTypes
export const fetchAllSpaceTypes = async (): Promise<
  ResponseFiner<SpaceType>
> => {
  const response = await get(`${baseUrl}/spaceType`);
  if (response.status === 200) {
    const spaceTypes: SpaceType[] = await response.json();
    return { httpStatus: response.status, data: spaceTypes };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// creating new spacetype
export const postNewSpaceType = async (
  newSpaceType: SpaceType,
): Promise<boolean> => {
  const response = await create(`${baseUrl}/spaceType`, newSpaceType);
  return response.ok;
};

// creating multiple spacetypes
export const postNewSpaceTypes = async (
  newSpaceType: SpaceType[],
): Promise<boolean> => {
  const response = await create(`${baseUrl}/spaceType/multi`, newSpaceType);
  return response.ok;
};

// updating spacetype
export const editSpaceType = async (
  editedSpaceType: SpaceType,
): Promise<boolean> => {
  const response = await update(`${baseUrl}/spaceType`, editedSpaceType);
  return response.ok;
};

// removing single spacetype
export const deleteSpaceTypeById = async (
  SpaceTypeId: number,
): Promise<boolean> => {
  const response = await remove(`${baseUrl}/spaceType/${SpaceTypeId}`);
  return response.ok;
};

export const downloadSpaceTypeTemplate = async (): Promise<
  ResponseFiner<SpaceType>
> => {
  return download<SpaceType>("SpaceType", baseUrl);
};
