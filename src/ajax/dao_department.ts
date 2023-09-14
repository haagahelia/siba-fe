import { Response, Department } from "../types";
import { create, get, remove, update } from "./request";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

//fetching all departments
export const fetchDepartmentData = async (): Promise<Response<Department>> => {
  const response = await get(`${baseUrl}/department`);
  const departments: Department[] = await response.json();
  return { success: response.ok, data: departments };
};

//create department
export const addDepartment = async (
  newDepartment: Department,
): Promise<boolean> => {
  const response = await create(`${baseUrl}/department`, newDepartment);
  return response.ok;
};

//update department
export const editDepartment = async (
  editedDepartment: Department,
): Promise<boolean> => {
  const response = await update(`${baseUrl}/department`, editedDepartment);
  return response.ok;
};

//remove single department
export const deleteDepartment = async (
  departmentId: number,
): Promise<boolean> => {
  const response = await remove(`${baseUrl}/department/${departmentId}`);
  if (response.status === 403) {
    return false;
  }
  const data = await response.json();
  return data?.returnedNumberValue === 1;
};
