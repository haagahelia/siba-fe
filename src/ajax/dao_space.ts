import { ResponseFiner, Space } from "../types";
import { get } from "./request";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

//fetching all spaces
export const fetchAllSpaces = async (): Promise<ResponseFiner<Space>> => {
  const response = await get(`${baseUrl}/space`);
  if (response.status === 200) {
    const spaces: Space[] = await response.json();
    return { httpStatus: response.status, data: spaces };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};