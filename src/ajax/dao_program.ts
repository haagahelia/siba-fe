import { Response, Program } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchProgramsForSelect = async (): Promise<Response<Program>> => {
  const request = new Request(`${baseUrl}/program/getSelectData`, {
    method: "GET",
  });

  const response = await fetch(request);
  const programs: Program[] = await response.json();
  return { success: response.ok, data: programs };
};
