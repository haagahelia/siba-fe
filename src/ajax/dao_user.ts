import { Response, User } from "../types";
import bcrypt from "bcryptjs";
//import jsonwebtoken from 'jsonwebtoken';

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

export const getUserByEmail = async (user: User): Promise<Response<User>> => {
  const request = new Request(`${baseUrl}/user/${user.email}`, {
    method: "GET",
  });
  const response = await fetch(request);
  const users: User[] = await response.json();
  bcrypt
    .compare(user.password, users[0].password)
    .then((passwordCheck) => {
      if (!passwordCheck) {
        console.log("error");
      } else {
        //const token = jsonwebtoken.sign({userEmail:user.email}, 'RANDOM-TOKEN', {expiresIn:'24h'})
        //console.log(token)
      }
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(users);
  return { success: response.ok, data: users };
};
