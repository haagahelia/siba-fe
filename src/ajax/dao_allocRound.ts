import { AllocRound, CopyAllocRound, Response } from "../types";
import { create, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all allocRounds
export const fetchAllAllocRounds = async (): Promise<Response<AllocRound>> => {
  const response = await get(`${baseUrl}/allocRound`);
  const allocrounds: AllocRound[] = await response.json();
  return { success: response.ok, data: allocrounds };
};

// fetching allocRound by ID:
export const fetchAllocRoundById = async (
  allocRoundId: number,
): Promise<Response<AllocRound>> => {
  const response = await get(`${baseUrl}/allocRound/${allocRoundId}`);
  const allocRound: AllocRound[] = await response.json();
  return { success: response.ok, data: allocRound };
};

// creating new allocRound
export const postNewAllocRound = async (
  newAllocRound: AllocRound,
): Promise<boolean> => {
  const response = await create(`${baseUrl}/allocRound`, newAllocRound);
  return response.ok;
};

// copy exsisting  allocRound
export const copyAllocRound = async (
  name: string,
  description: string,
  userId: number,
  copiedAllocRoundId: number,
): Promise<Response<CopyAllocRound>> => {
  const requestBody = {
    name,
    description,
    userId,
    copiedAllocRoundId,
  };

  const response = await create(
    `${baseUrl}/allocRound/copyAllocRound`,
    requestBody,
  );
  const data: CopyAllocRound[] = await response.json();

  return { success: response.ok, data: data };
};

// updating allocRound
export const editAllocRound = async (
  editedAllocRound: AllocRound,
): Promise<boolean> => {
  const response = await update(`${baseUrl}/allocRound`, editedAllocRound);
  return response.ok;
};

// remove single allocRound
export const deleteSingleAllocRound = async (id: number): Promise<boolean> => {
  const response = await remove(`${baseUrl}/allocRound/${id}`);
  return response.ok;
};
