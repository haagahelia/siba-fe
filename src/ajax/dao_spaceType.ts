import { ResponseFiner, SpaceType } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchSpacetypeForSelect = async (): Promise<
  ResponseFiner<SpaceType>
> => {
  const request = new Request(`${baseUrl}/spaceType/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);

  if (response.status === 200) {
    const programs: SpaceType[] = await response.json();
    return { httpStatus: response.status, data: programs };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};
