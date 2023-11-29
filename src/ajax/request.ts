import { ResponseFiner } from "../types/index";
// CRUD operations

export const get = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  return response;
};

export const create = async (url: string, newObject: object) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObject),
  });
  return response;
};

export const update = async (url: string, updatedObject: object) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedObject),
  });
  return response;
};

export const remove = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  return response;
};

//download template
export const download = async <T>(
  viewName: string,
  url: string,
): Promise<ResponseFiner<T>> => {
  const response = await get(`${url}/template/${viewName}`);
  if (response.status === 200) {
    const templateFile = await response.blob();
    return { httpStatus: response.status, data: templateFile };
  } else {
    return { httpStatus: response.status, data: [] };
  }
};
