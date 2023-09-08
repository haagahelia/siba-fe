import { Response, SpaceType } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchSpacetypeForSelect = async (): Promise<
  Response<SpaceType>
> => {
  const request = new Request(`${baseUrl}/spaceType/`, {
    method: "GET",
  });

  const response = await fetch(request);
  const programs: SpaceType[] = await response.json();
  return { success: response.ok, data: programs };
};
