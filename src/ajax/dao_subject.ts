//import Logger from "../logger/logger";
import { /*Response,*/ ResponseFiner, Subject, SubjectName } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchAllSubjects = async (): Promise<ResponseFiner<Subject>> => {
  const request = new Request(`${baseUrl}/subject/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  // Logger.debug("Session token from localStorage?:", localStorage.getItem("sessionToken"));
  const response = await fetch(request);

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
  const request = new Request(`${baseUrl}/subject/getNames`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  const response = await fetch(request);

  if (response.status === 200) {
    const subjects: SubjectName[] = await response.json(); // 200+JSON Data,
    return { httpStatus: response.status, data: subjects };
  } else {
    return { httpStatus: response.status, data: [] }; // 401+"error", 403+"error", 400+"some"
  }
};

export const postNewSubject = async (newSubject: Subject): Promise<boolean> => {
  const request = new Request(`${baseUrl}/subject/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSubject),
  });
  const response = await fetch(request);
  return response.ok;
};

export const editSubject = async (editedSubject: Subject): Promise<boolean> => {
  const request = new Request(`${baseUrl}/subject/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedSubject),
  });
  const response = await fetch(request);
  return response.ok;
};

export const deleteSingleSubject = async (
  subjectId: number,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/subject/${subjectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  const response = await fetch(request);
  const data = await response.json();

  return data?.affectedRows === 1;
};
