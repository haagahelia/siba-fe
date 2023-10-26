import { Program, ResponseFiner } from "../types";
import { get, getById } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching all programs
export const fetchProgramsForSelect = async (): Promise<
  ResponseFiner<Program>
> => {
  const response = await get(`${baseUrl}/program`);
  if (response.status === 200) {
    const programs: Program[] = await response.json();
    return { httpStatus: response.status, data: programs };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

export const getProgramByUserId = async (
  departmentId: number,
): Promise<ResponseFiner<Program>> => {
  const response = await getById(`${baseUrl}/program/progName/${departmentId}`);
  if (response.status === 200) {
    const programs: Program[] = await response.json();
    return { httpStatus: response.status, data: programs };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};
