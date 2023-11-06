import { ResponseFiner, Subject, SubjectName } from "../types";
import { create, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all subjects
export const fetchAllSubjects = async (): Promise<ResponseFiner<Subject>> => {
  const response = await get(`${baseUrl}/subject`);
  if (response.status === 200) {
    const subjects: Subject[] = await response.json();
    return { httpStatus: response.status, data: subjects };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// fetching all subject's names
export const fetchSubjectsNames = async (): Promise<
  ResponseFiner<SubjectName>
> => {
  const response = await get(`${baseUrl}/subject/getNames`);
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
): Promise<boolean> => {
  console.log("ajax", newSubject);
  const response = await create(`${baseUrl}/subject/multi`, newSubject);
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
  return data?.affectedRows === 1;
};

export const downloadSubjectTemplate = async (): Promise<
  ResponseFiner<Subject>
> => {
  const response = await get(`${baseUrl}/template/subject`);
  if (response.status === 200) {
    const templateFile = await response.blob();
    return { httpStatus: response.status, data: templateFile };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};
