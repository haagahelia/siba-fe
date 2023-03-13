import { Response, Building } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchAllBuildings = async (): Promise<Response<Building>> => {
  const request = new Request(`${baseUrl}/building`, {
    method: "GET",
  });
  const response = await fetch(request);
  const buildings: Building[] = await response.json();

  // console.log(buildings);

  return { success: response.ok, data: buildings };
};
