import { Response, User, UserLoggedIn } from "../types";
import bcrypt from "bcryptjs";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

export const postNewUser = async (newUser: User): Promise<boolean> => {
  const request = new Request(`${baseUrl}/user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
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
  const response = await fetch(request);
  const users: UserLoggedIn[] = await response.json();

  return { success: response.ok, data: users };
};
