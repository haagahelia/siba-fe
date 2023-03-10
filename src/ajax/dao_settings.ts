import { Response, Settings } from "../types";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const fetchSettings = async (): Promise<Response<Settings>> => {
  const request = new Request(`${baseUrl}/setting`, {
    method: "GET",
  });

  const response = await fetch(request);
  const settings: Settings[] = await response.json();
  return { success: response.ok, data: settings };
};
