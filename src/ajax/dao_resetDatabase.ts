import { get } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;
const mode = import.meta.env.VITE_MODE;

export const resetDatabase = async () => {
  if (mode === "development") {
    const response = await get(`${baseUrl}/resetDatabase`);
    if (response.status === 200) {
      const data = await response.json();
      return { httpStatus: response.status, data: data };
    } else {
      return { httpStatus: response.status, data: [] };
    }
  }
};
