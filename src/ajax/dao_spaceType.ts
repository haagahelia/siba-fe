import { ResponseFiner, SpaceType } from "../types";
import { get } from "./request";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

// fetching all spaceTypes
export const fetchSpacetypeForSelect = async (): Promise<
  ResponseFiner<SpaceType>
> => {
  const response = await get(`${baseUrl}/spaceType`);
  if (response.status === 200) {
    const programs: SpaceType[] = await response.json();
    return { httpStatus: response.status, data: programs };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};
