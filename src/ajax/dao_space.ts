import { ResponseFiner, Space, SpaceBuildingName, SpaceName } from "../types";
import { create, download, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all spaces
export const fetchAllSpaces = async (): Promise<ResponseFiner<Space>> => {
  const response = await get(`${baseUrl}/space`);
  if (response.status === 200) {
    const spaces: Space[] = await response.json();
    return { httpStatus: response.status, data: spaces };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// creating new space
export const postNewSpace = async (newSpace: Space): Promise<boolean> => {
  const response = await create(`${baseUrl}/space`, newSpace);
  return response.ok;
};

// creating multiple spaces
export const postNewSpaces = async (newSpace: Space[]): Promise<boolean> => {
  const response = await create(`${baseUrl}/space/multi`, newSpace);
  return response.ok;
};

// fetching all space's names
export const fetchSpacesNames = async (): Promise<ResponseFiner<SpaceName>> => {
  const response = await get(`${baseUrl}/space/getNames`);
  if (response.status === 200) {
    const spaces: SpaceName[] = await response.json();
    return { httpStatus: response.status, data: spaces };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

export const fetchSpacesNamesInBuilding = async (): Promise<
  ResponseFiner<SpaceBuildingName>
> => {
  const response = await get(`${baseUrl}/space/NameInBuilding`);
  if (response.status === 200) {
    const spaces: SpaceBuildingName[] = await response.json();
    return { httpStatus: response.status, data: spaces };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// Updating space
export const editSpace = async (editedSpace: Space): Promise<boolean> => {
  const response = await update(`${baseUrl}/space`, editedSpace);
  return response.ok;
};

// removing single space
export const deleteSingleSpace = async (spaceId: number): Promise<boolean> => {
  const response = await remove(`${baseUrl}/space/${spaceId}`);
  const data = await response.json();
  return data?.affectedRows === 1;
};

export const downloadSpaceTemplate = async (): Promise<
  ResponseFiner<Space>
> => {
  return download<Space>("space", baseUrl);
};
