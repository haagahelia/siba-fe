import { Response, Program } from "../types";

export const fetchProgramsForSelect = async (): Promise<Response<Program>> => {
  const request = new Request(
    "http://localhost:3001/api/program/getSelectData",
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  const programs: Program[] = await response.json();
  return { success: response.ok, data: programs };
};
