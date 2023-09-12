import { Response, Department } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchDepartmentData = async (): Promise<Response<Department>> => {
  const request = new Request(`${baseUrl}/department/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });

  const response = await fetch(request);
  const departments: Department[] = await response.json();
  return { success: response.ok, data: departments };
};

export const deleteDepartment = async (
  departmentId: number,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/department/${departmentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });

  const response = await fetch(request);
  if (response.status === 403) {
    return false;
  }
  const data = await response.json();

  return data?.returnedNumberValue === 1;
};

export const addDepartment = async (
  newDepartment: Department,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/department/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDepartment),
  });
  const response = await fetch(request);
  return response.ok;
};

export const editDepartment = async (
  editedDepartment: Department,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/department/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedDepartment),
  });
  const response = await fetch(request);
  return response.ok;
};
