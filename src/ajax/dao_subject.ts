import Logger from "../logger/logger";
import { Response, Subject, SubjectName } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchAllSubjects = async (): Promise<Response<Subject>> => {
  const request = new Request(`${baseUrl}/subject/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  Logger.debug("Sessio n token:", localStorage.getItem("sessionToken"));
  const response = await fetch(request);
  const subjects: Subject[] = await response.json();

  return { success: response.ok, data: subjects };
};

export const fetchSubjectsNames = async (): Promise<Response<SubjectName>> => {
  const request = new Request(`${baseUrl}/subject/getNames`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  const response = await fetch(request);
  const subjects: SubjectName[] = await response.json();

  return { success: response.ok, data: subjects };
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
