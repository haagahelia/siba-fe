import { /*Response*/ ResponseFiner } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

// TODO: get type definition for data

export const getUnAllocableSubjects = async (
  id: number,
): Promise<ResponseFiner<any>> => {
  const request = new Request(
    `${baseUrl}/allocation/${id}/subject/unallocated`,
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  if (response.status === 200) {
    const data = await response.json();
    return { httpStatus: response.status, data};
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// TODO: get type definition for data
export const getSubjectRooms = async (id: number): Promise<ResponseFiner<any>> => {
  const request = new Request(`${baseUrl}/allocation/subject/${id}/rooms`, {
    method: "GET",
  });

  const response = await fetch(request);
  if (response.status === 200) {
    const data = await response.json();
    return { httpStatus: response.status, data};
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// TODO: get type definition for data
export const getMissingEquipmentForRoom = async (
  subjectId: number,
  roomId: number,
): Promise<ResponseFiner<any>> => {
  const request = new Request(
    `${baseUrl}/allocation/missing-eqpt/subject/${subjectId}/room/${roomId}`,
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  if (response.status === 200) {
    const data = await response.json();
    return { httpStatus: response.status, data};
  } else {
    return { httpStatus: response.status, data: [] };
  }
};