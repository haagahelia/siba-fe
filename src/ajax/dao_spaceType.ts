import { Response, SpaceType } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchSpacetypeData = async (): Promise<Response<SpaceType>> => {
  const request = new Request(`${baseUrl}/spaceType/getSelectData`, {
    method: "GET",
  });

  const response = await fetch(request);
  const programs: SpaceType[] = await response.json();

  return { success: response.ok, data: programs };
};

export const postNewSpaceType = async (
  newSpaceType: SpaceType,
): Promise<boolean> => {
  const request = new Request(`${baseUrl}/spaceType/post`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSpaceType),
  });
  const response = await fetch(request);
  return response.ok;
};
