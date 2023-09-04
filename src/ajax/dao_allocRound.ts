import { Response, AllocRound } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

// TODO: get type definition for data

export const fetchAllAllocRounds = async (): Promise<Response<AllocRound>> => {
  const request = new Request(`${baseUrl}/allocRound`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);
  const allocrounds: AllocRound[] = await response.json();

  return { success: response.ok, data: allocrounds };
};
export const postNewAllocRound = async (
  newAllocRound: AllocRound,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/allocRound/post`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAllocRound),
  });
  const response = await fetch(request);
  return response.ok;
};
export const deleteSingleAllocRound = async (id: number): Promise<boolean> => {
  const request = new Request(`${baseUrl}/allocRound/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await fetch(request);
  const data = await response.json();

  return data?.returnedNumberValue === 1;
};

export const editAllocRound = async (
  editedAllocRound: AllocRound,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/allocRound/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedAllocRound),
  });
  const response = await fetch(request);
  return response.ok;
};
