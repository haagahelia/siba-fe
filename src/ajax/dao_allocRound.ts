import { AllocRound, Response } from "../types";
import { create, get, remove, update } from "./request";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

// fetching all allocRounds
export const fetchAllAllocRounds = async (): Promise<Response<AllocRound>> => {
  const response = await get(`${baseUrl}/allocRound`);
  const allocrounds: AllocRound[] = await response.json();
  return { success: response.ok, data: allocrounds };
};

// creating new allocRound
export const postNewAllocRound = async (
  newAllocRound: AllocRound,
): Promise<boolean> => {
  const response = await create(`${baseUrl}/allocRound`, newAllocRound);
  return response.ok;
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
  const data = await response.json();
  return data?.returnedNumberValue === 1;
};
