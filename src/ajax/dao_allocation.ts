import {
  MissingEquipment,
  ResponseFiner,
  SubjectRoom,
  UnallocableSubject,
} from "../types";
import { get } from "./request";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

// fetching unAllocableSubjects
export const getUnAllocableSubjects = async (
  id: number,
): Promise<ResponseFiner<UnallocableSubject>> => {
  const response = await get(`${baseUrl}/allocation/${id}/subject/unallocated`);
  if (response.status === 200) {
    const data = await response.json();
    return { httpStatus: response.status, data };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// fetching SubjectRooms
export const getSubjectRooms = async (
  id: number,
): Promise<ResponseFiner<SubjectRoom>> => {
  const response = await get(`${baseUrl}/allocation/subject/${id}/rooms`);
  if (response.status === 200) {
    const data = await response.json();
    return { httpStatus: response.status, data };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// fetcing missingEquipmentForRoom
export const getMissingEquipmentForRoom = async (
  subjectId: number,
  roomId: number,
): Promise<ResponseFiner<MissingEquipment>> => {
  const response = await get(
    `${baseUrl}/allocation/missing-eqpt/subject/${subjectId}/room/${roomId}`,
  );
  if (response.status === 200) {
    const data = await response.json();
    return { httpStatus: response.status, data };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};
