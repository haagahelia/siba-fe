import { Response, Program } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchProgramsForSelect = async (): Promise<Response<Program>> => {
  const request = new Request(`${baseUrl}/program`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);
  const programs: Program[] = await response.json();
  return { success: response.ok, data: programs };
};
