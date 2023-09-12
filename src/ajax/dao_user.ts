import Logger from "../logger/logger";
import { Response, User, UserLoggedIn, Subject, ResponseFiner } from "../types";

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

export const fetchAllUsers = async (): Promise<ResponseFiner<Subject>> => {
  const request = new Request(`${baseUrl}/user/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await fetch(request);

  if (response.status === 200) {
    const users: Subject[] = await response.json();
    return { httpStatus: response.status, data: users };
  } else {
    return { httpStatus: response.status, data: [] };
  }
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
