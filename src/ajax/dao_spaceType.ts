import { Response, SpaceType } from "../types";

export const fetchSpacetypeForSelect = async (): Promise<
  Response<SpaceType>
> => {
  const request = new Request(
    "http://localhost:3001/api/spaceType/getSelectData",
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  const programs: SpaceType[] = await response.json();
  return { success: response.ok, data: programs };
};
