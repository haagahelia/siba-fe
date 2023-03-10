import { Response, Settings } from "../types";

export const fetchSettings = async (): Promise<Response<Settings>> => {
  const request = new Request("http://localhost:3001/api/setting", {
    method: "GET",
  });

  const response = await fetch(request);
  const settings: Settings[] = await response.json();
  return { success: response.ok, data: settings };
};
