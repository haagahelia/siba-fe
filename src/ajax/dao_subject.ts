//import Logger from "../logger/logger";
import { /*Response,*/ ResponseFiner, Subject, SubjectName } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchAllSubjects = async (): Promise<ResponseFiner<Subject>> => {
  const response = await fetch(`${baseUrl}/subject`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  if (response.status === 200) {
    const subjects: Subject[] = await response.json();
    return { httpStatus: response.status, data: subjects };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

export const fetchSubjectsNames = async (): Promise<
  ResponseFiner<SubjectName>
> => {
  const response = await fetch(`${baseUrl}/subject/getNames`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });

  if (response.status === 200) {
    const subjects: SubjectName[] = await response.json(); // 200+JSON Data,
    console.log("suraj", subjects);
    return { httpStatus: response.status, data: subjects };
  } else {
    return { httpStatus: response.status, data: [] }; // 401+"error", 403+"error", 400+"some"
  }
};

export const postNewSubject = async (newSubject: Subject): Promise<boolean> => {
  const response = await fetch(`${baseUrl}/subject/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSubject),
  });
  return response.ok;
};

export const editSubject = async (editedSubject: Subject): Promise<boolean> => {
  const response = await fetch(`${baseUrl}/subject/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedSubject),
  });
  return response.ok;
};

export const deleteSingleSubject = async (
  subjectId: number,
): Promise<boolean> => {
  const response = await fetch(`${baseUrl}/subject/${subjectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  const data = await response.json();
  return data?.affectedRows === 1;
};
