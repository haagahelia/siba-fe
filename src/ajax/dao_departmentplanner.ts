import { Departmentplanner, Response } from "../types";
import { create, get, remove } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching Departmentplanner by userId
export const fetchDepartmentplannerByUserId = async (
  id: number,
): Promise<Response<Departmentplanner>> => {
  const response = await get(`${baseUrl}/departmentplanner/${id}`);
  const departments: Departmentplanner[] = await response.json();
  return { success: response.ok, data: departments };
};

// creating new Departmentplanner
export const postNewDepartmentPlanner = async (
  newDepartmentPlanner: Departmentplanner,
): Promise<boolean> => {
  const response = await create(
    `${baseUrl}/departmentplanner`,
    newDepartmentPlanner,
  );
  const data = await response.json();
  return data;
};

// removing single departmentPlanner
export const deleteSingleDepartmentPlanner = async (
  userId: number,
  departmentId: number,
): Promise<boolean> => {
  const response = await remove(
    `${baseUrl}/departmentplanner/${userId}/${departmentId}`,
  );
  return response.ok;
};
