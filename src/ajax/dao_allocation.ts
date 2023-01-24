import { Response } from "../types";

// TODO: get type definition for data
export const getUnAllocableSubjects = async (
  id: number,
): Promise<Response<any>> => {
  const request = new Request(
    `http://localhost:3001/api/allocation/${id}/subject/unallocated`,
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
  const request = new Request(
    `http://localhost:3001/api/allocation/subject/${id}/rooms`,
    {
      method: "GET",
    },
  );

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
    `http://localhost:3001/api/allocation/missing-eqpt/subject/${subjectId}/room/${roomId}`,
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  const data = await response.json();
  return { success: response.ok, data };
};
