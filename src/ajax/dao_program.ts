import { Program, ResponseFiner } from "../types";
import { get, getByEmail } from "./request";

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

export const getProgramByUserEmail = async (
  email: string,
): Promise<ResponseFiner<Program>> => {
  const response = await getByEmail(`${baseUrl}/program/programName/${email}`);
  if (response.status === 200) {
    const programs: Program[] = await response.json();
    return { httpStatus: response.status, data: programs };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};
