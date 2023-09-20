import Logger from "../logger/logger";
import {User, UserLoggedIn, ResponseFiner } from "../types";
import { create, get } from "./request";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

//fetching all users
export const fetchAllUsers = async (): Promise<ResponseFiner<User>> => {
  const response = await get(`${baseUrl}/user`);
  if (response.status === 200) {
    const users: User[] = await response.json();
    return { httpStatus: response.status, data: users };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};

//creating a new user
export const postNewUser = async (newUser: User): Promise<boolean> => {
  const response = await create(`${baseUrl}/user`, newUser);
  return response.ok;
};

export const loginUser = async (
  user: User,
): Promise<ResponseFiner<UserLoggedIn>> => {
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

  if (response.status === 200) {
    const users: UserLoggedIn[] = await response.json();
    return { httpStatus: response.status, data: users };
  } else {
    return { httpStatus: response.status, data: [] };
  }

};
