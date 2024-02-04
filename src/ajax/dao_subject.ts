import Logger from "../logger/logger";
import { ResponseFiner, Subject, SubjectName } from "../types";
import { create, download, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all subjects
export const fetchAllSubjects = async (
  allocRoundId: number,
): Promise<ResponseFiner<Subject>> => {
  const response = await get(
    `${baseUrl}/subject/byAllocationId/${allocRoundId}`,
  );
  if (response.status === 200) {
    const subjects: Subject[] = await response.json();
    return { httpStatus: response.status, data: subjects };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// fetching one subject by id
export const fetchSubjectById = async (
  id: number,
): Promise<ResponseFiner<Subject>> => {
  const response = await get(`${baseUrl}/subject/${id}`);
  if (response.status === 200) {
    const subjects: Subject[] = await response.json();
    if (subjects.length === 1) {
      return { httpStatus: response.status, data: subjects };
    } else {
      return { httpStatus: 409, data: [] };
    }
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// fetching all subject's names
export const fetchSubjectNames = async (
  allocRoundId: number,
): Promise<ResponseFiner<SubjectName>> => {
  const response = await get(`${baseUrl}/subject/getNames/${allocRoundId}`);
  if (response.status === 200) {
    const subjects: SubjectName[] = await response.json();
    return { httpStatus: response.status, data: subjects };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// creating new subject
export const postNewSubject = async (newSubject: Subject): Promise<boolean> => {
  const response = await create(`${baseUrl}/subject`, newSubject);
  return response.ok;
};

// import multiple subject
export const postNewSubjects = async (
  newSubject: Subject[],
  allocRoundId: number,
): Promise<boolean> => {
  Logger.debug("ajax dao_subject: importing multiple subjects:", newSubject);
  const response = await create(
    `${baseUrl}/subject/multi/${allocRoundId}`,
    newSubject,
  );
  return response.ok;
};

// updating subject
export const editSubject = async (editedSubject: Subject): Promise<boolean> => {
  const response = await update(`${baseUrl}/subject`, editedSubject);
  return response.ok;
};

// removing single subject
export const deleteSingleSubject = async (
  subjectId: number,
): Promise<boolean> => {
  const response = await remove(`${baseUrl}/subject/${subjectId}`);
  const data = await response.json();
  return data?.returnedNumberValue === 1;
};

export const downloadSubjectTemplate = async (): Promise<
  ResponseFiner<Subject>
> => {
  return download<Subject>("subject", baseUrl);
};
