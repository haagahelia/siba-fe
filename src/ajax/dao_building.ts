import { Response, Building } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchAllBuildings = async (): Promise<Response<Building>> => {
  const request = new Request(`${baseUrl}/building`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  const response = await fetch(request);
  const buildings: Building[] = await response.json();

  return { success: response.ok, data: buildings };
};

export const postNewBuilding = async (
  newBuilding: Building,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/building/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBuilding),
  });
  const response = await fetch(request);

  return response.ok;
};

export const postNewBuildings = async (
  newBuilding: Building,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/building/multi`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBuilding),
  });
  const response = await fetch(request);

  return response.ok;
};

export const deleteBuildingById = async (
  buildingId: number,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/building/${buildingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });

  const response = await fetch(request);
  if (response.status === 403) {
    return false;
  }
  const data = await response.json();

  return data?.returnedNumberValue === 1;
};

export const editBuilding = async (
  editedBuilding: Building,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/building/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedBuilding),
  });
  const response = await fetch(request);
  if (response.status === 403) {
    return false;
  }
  const data = await response.json();

  return data?.returnedNumberValue === 1;
};
