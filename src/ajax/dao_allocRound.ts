import { Response, AllocRound } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

// TODO: get type definition for data

export const fetchAllAllocRounds = async (): Promise<Response<AllocRound>> => {
  const request = new Request(`${baseUrl}/allocation`, {
    method: "GET",
  });

  const response = await fetch(request);
  const allocrounds: AllocRound[] = await response.json();

  return { success: response.ok, data: allocrounds };
};
export const postNewAllocRound = async (
  newAllocRound: AllocRound,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/allocation/post`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAllocRound),
  });
  const response = await fetch(request);
  return response.ok;
};
export const deleteSingleAllocRound = async (id: number): Promise<boolean> => {
  const request = new Request(`${baseUrl}/allocation/delete/${id}`, {
    method: "DELETE",
  });
  const response = await fetch(request);
  const data = await response.json();

  return data?.affectedRows === 1;
};

export const editAllocRound = async (
  editedAllocRound: AllocRound,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/allocation/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedAllocRound),
  });
  const response = await fetch(request);
  return response.ok;
};
