import Logger from "../logger/logger";
import { Program, ResponseFiner } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchProgramsForSelect = async (): Promise<
  ResponseFiner<Program>
> => {
  const request = new Request(`${baseUrl}/program`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  Logger.debug("Sessio n token:", localStorage.getItem("sessionToken"));

  const response = await fetch(request);
  if (response.status === 200) {
    const programs: Program[] = await response.json();
    return { httpStatus: response.status, data: programs };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};
