import { Response, Allocation } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

// TODO: get type definition for data

export const fetchAllAllocations = async (): Promise<Response<Allocation>> => {
  const request = new Request(`${baseUrl}/allocation`, {
    method: "GET",
  });

  const response = await fetch(request);
  const allocations: Allocation[] = await response.json();

  return { success: response.ok, data: allocations };
};

export const getUnAllocableSubjects = async (
  id: number,
): Promise<Response<any>> => {
  const request = new Request(
    `${baseUrl}/allocation/${id}/subject/unallocated`,
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  const data = await response.json();
  return { success: response.ok, data };
};

// TODO: get type definition for data
export const getSubjectRooms = async (id: number): Promise<Response<any>> => {
  const request = new Request(`${baseUrl}/allocation/subject/${id}/rooms`, {
    method: "GET",
  });

  const response = await fetch(request);
  const data = await response.json();
  return { success: response.ok, data };
};

// TODO: get type definition for data
export const getMissingEquipmentForRoom = async (
  subjectId: number,
  roomId: number,
): Promise<Response<any>> => {
  const request = new Request(
    `${baseUrl}/allocation/missing-eqpt/subject/${subjectId}/room/${roomId}`,
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  const data = await response.json();
  return { success: response.ok, data };
};
