import Logger from "../logger/logger";
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

// fetching one space by id
export const fetchSpaceById = async (
  id: number,
): Promise<ResponseFiner<Space>> => {
  const response = await get(`${baseUrl}/space/${id}`);
  if (response.status === 200) {
    const spaces: Space[] = await response.json();
    if (spaces.length === 1) {
      return { httpStatus: response.status, data: spaces };
    } else {
      return { httpStatus: 409, data: [] };
    }
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
export const fetchSpaceNames = async (): Promise<ResponseFiner<SpaceName>> => {
  const response = await get(`${baseUrl}/space/getNames`);
  if (response.status === 200) {
    const spaces: SpaceName[] = await response.json();
    return { httpStatus: response.status, data: spaces };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

export const fetchSpaceNamesInBuilding = async (): Promise<
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
  return response.ok;
};

export const downloadSpaceTemplate = async (): Promise<
  ResponseFiner<Space>
> => {
  return download<Space>("space", baseUrl);
};

// Function to fetch spaces by building ID
export const fetchSpacesByBuildingId = async (buildingId: number) => {
  try {
    const response = await get(`${baseUrl}/space/byBuilding/${buildingId}`);
    if (response.status === 200) {
      const spaces = await response.json();
      return { httpStatus: response.status, data: spaces };
    } else {
      console.error("Failed to fetch spaces for building ID:", buildingId);
      return { httpStatus: response.status, data: [] };
    }
  } catch (error) {
    console.error("Error fetching spaces by building ID:", error);
    return { httpStatus: 500, data: [] };
  }
};

// Function to fetch spaces by SpaceType ID
export const fetchSpacesBySpaceTypeId = async (spaceTypeId: number) => {
  try {
    const response = await get(`${baseUrl}/space/bySpaceType/${spaceTypeId}`);
    if (response.status === 200) {
      const spaces = await response.json();
      return { httpStatus: response.status, data: spaces };
    } else {
      console.error("Failed to fetch spaces for space type ID:", spaceTypeId);
      return { httpStatus: response.status, data: [] };
    }
  } catch (error) {
    console.error("Error fetching spaces by space type ID:", error);
    return { httpStatus: 500, data: [] };
  }
};

// function fetch number of alloc associated with spce by id
export const fetchNumberOfAllocSpaces = async (id: number) => {
  try {
    const response = await get(`${baseUrl}/space/${id}/numberOfAllocSpaces`);
    if (response.status === 200) {
      const allocSpacesCount = await response.json();
      return { httpStatus: response.status, data: allocSpacesCount };
    } else {
      Logger.debug("Failed to fetch alloc spaces for space ID:", id);
      return { httpStatus: response.status, data: 0 };
    }
  } catch (error) {
    Logger.debug("Error fetching alloc spaces by space ID:", error);
    return { httpStatus: 500, data: 0 };
  }
};

// function fetching first five names of allocation associated with space by id

export const fetchFirstFiveAllocNames = async (id: number) => {
  try {
    const response = await get(`${baseUrl}/space/${id}/firstFiveAllocNames`);
    if (response.status === 200) {
      const firstFiveNames = await response.json();
      return { httpStatus: response.status, data: firstFiveNames };
    } else {
      Logger.debug(
        "Failed to fetch first five names of alloc by space ID:",
        id,
      );
      return { httpStatus: response.status, data: [] };
    }
  } catch (error) {
    Logger.debug(
      "Error fetching first five names of alloc by space ID:",
      error,
    );
    return { httpStatus: 500, data: [] };
  }
};
