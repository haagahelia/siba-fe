import { Response, Department } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchDepartmentData = async (): Promise<Response<Department>> => {
  const request = new Request(`${baseUrl}/department/getDeptData`, {
    method: "GET",
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
  });

  const response = await fetch(request);
  const data = await response.json();

  return data?.affectedRows === 1;
};
