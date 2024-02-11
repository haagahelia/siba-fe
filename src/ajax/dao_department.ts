import { Department, Response, ResponseFiner } from "../types";
import { create, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all departments
export const fetchDepartmentData = async (): Promise<Response<Department>> => {
  const response = await get(`${baseUrl}/department`);
  const departments: Department[] = await response.json();
  return { success: response.ok, data: departments };
};

// fetching all departments finer
export const fetchAllDepartmentData = async (): Promise<
  ResponseFiner<Department>
> => {
  const response = await get(`${baseUrl}/department`);
  if (response.status === 200) {
    const departments: Department[] = await response.json();
    return { httpStatus: response.status, data: departments };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// fetching all departments for select
export const fetchDepartmentForSelect = async (): Promise<
  ResponseFiner<Department>
> => {
  const response = await get(`${baseUrl}/department`);
  if (response.status === 200) {
    const programs: Department[] = await response.json();
    return { httpStatus: response.status, data: programs };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

// create department
export const addDepartment = async (
  newDepartment: Department,
): Promise<boolean> => {
  const response = await create(`${baseUrl}/department`, newDepartment);
  return response.ok;
};

// update department
export const editDepartment = async (
  editedDepartment: Department,
): Promise<boolean> => {
  const response = await update(`${baseUrl}/department`, editedDepartment);
  return response.ok;
};

// remove single department
export const deleteDepartment = async (
  departmentId: number,
): Promise<boolean> => {
  const response = await remove(`${baseUrl}/department/${departmentId}`);
  return response.ok;
  /*const data = await response.json();
  return data?.returnedNumberValue === 1; 
  */
};
