import { Response, Department } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchDepartmentData = async (): Promise<Response<Department>> => {
  const request = new Request(`${baseUrl}/department/getDeptData`, {
    method: "GET",
  });
  console.log("Starting to fetch departments:");
  const response = await fetch(request);
  const departments: Department[] = await response.json();
  console.log(`Departments:${departments}`);
  console.log(`Departments[0]:${departments[0].id}-${departments[0].name}`);
  return { success: response.ok, data: departments };
};
