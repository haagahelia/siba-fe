import {
  ResponseFiner,
  UnallocableSubject,
  SubjectRoom,
  MissingEquipment,
} from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const getUnAllocableSubjects = async (
  id: number,
): Promise<ResponseFiner<UnallocableSubject>> => {
  const request = new Request(
    `${baseUrl}/allocation/${id}/subject/unallocated`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  const response = await fetch(request);
  if (response.status === 200) {
    const data = await response.json();
    return { httpStatus: response.status, data };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

export const getSubjectRooms = async (
  id: number,
): Promise<ResponseFiner<SubjectRoom>> => {
  const request = new Request(`${baseUrl}/allocation/subject/${id}/rooms`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);
  if (response.status === 200) {
    const data = await response.json();
    return { httpStatus: response.status, data };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

export const getMissingEquipmentForRoom = async (
  subjectId: number,
  roomId: number,
): Promise<ResponseFiner<MissingEquipment>> => {
  const request = new Request(
    `${baseUrl}/allocation/missing-eqpt/subject/${subjectId}/room/${roomId}`,
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  if (response.status === 200) {
    const data = await response.json();
    return { httpStatus: response.status, data };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};
