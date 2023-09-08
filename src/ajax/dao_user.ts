import Logger from "../logger/logger";
import { Response, User, UserLoggedIn } from "../types";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const postNewUser = async (newUser: User): Promise<boolean> => {
  const request = new Request(`${baseUrl}/user/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  Logger.debug("postNewUser", request);
  const response = await fetch(request);
  return response.ok;
};

export const getUserByEmail = async (
  user: User,
): Promise<Response<UserLoggedIn>> => {
  const request = new Request(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  Logger.debug("getUserByEmail", request);
  const response = await fetch(request);
  const users: UserLoggedIn[] = await response.json();

  return { success: response.ok, data: users };
};
