const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

// TODO: Jossakin vaiheessa poistetaan backistä URLeista loput, eli
// ei tarvita esim. /getAll  /delete  /post
// Http Method kertoo sen jo, esim /subject/  GET ilman id:tä => get all subjects
// DELETE, POST jne.

// TODO: Mikähän tänne olis hyvä nimeämiskäytäntö? Siis fetchSubjects,
// getSubjects, getAllSubjects?

const fetchSubjects = async () => {
  const request = new Request("http://localhost:3001/api/subject/getAll", {
    method: "GET",
  });
  const response = await fetch(request);

  if (response.status === 500) {
    return 500;
  }

  const data = await response.json();
  // console.log("Data: ", data);
  return data;
};

const deleteSingleSubject = async (subjectId) => {
  try {
    const request = new Request(
      `http://localhost:3001/api/subject/delete/${subjectId}`,
      {
        method: "DELETE",
      }
    );
    const response = await fetch(request);
    if (response.status === 400) {
      return 400;
    }

    const data = await response.json();
    const result = data && data.affectedRows === 1 ? true : false;
    return result;
  } catch (error) {
    return "error";
  }
};

const postNewSubject = async (newSubject) => {
  try {
    const request = new Request("http://localhost:3001/api/subject/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSubject),
    });
    const response = await fetch(request);
    if (response.status === 400) {
      return 400;
    }

    if (response.status === 500) {
      return 500;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return "error";
  }
};

const editSubject = async (editedSubject) => {
  try {
    const request = new Request("http://localhost:3001/api/subject/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedSubject),
    });
    const response = await fetch(request);
    if (response.status === 400) {
      return 400;
    }

    if (response.status === 500) {
      return 500;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return "error";
  }
};

const getProgramNames = async () => {
  const request = new Request("http://localhost:3001/api/program/getNames", {
    method: "GET",
  });

  const response = await fetch(request);
  if (response.status === 500) {
    return 500;
  }
  const data = await response.json();
  return data;
};

const getSpaceTypeNames = async () => {
  const request = new Request("http://localhost:3001/api/spaceType/getNames", {
    method: "GET",
  });

  const response = await fetch(request);
  if (response.status === 500) {
    return 500;
  }
  const data = await response.json();
  return data;
};

const getEquipmentNames = async () => {
  const request = new Request("http://localhost:3001/api/equipment/getNames", {
    method: "GET",
  });

  const response = await fetch(request);
  if (response.status === 500) {
    return 500;
  }
  const data = await response.json();
  return data;
};

const postNewSubjectEquipment = async (newSubjectEquipment) => {
  try {
    const request = new Request(
      "http://localhost:3001/api/subjectequipment/post",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubjectEquipment),
      }
    );
    const response = await fetch(request);
    console.log("Respomse1", response);
    if (response.status === 400) {
      return 400;
    }

    if (response.status === 500) {
      return 500;
    }
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    return "error";
  }
};
/*
const fetchCategories = async () => {
    const request = new Request(`${baseUrl}/category/`,{
        method: 'GET',  
    });

    const response = await fetch(request);
    const data = await response.json();
    return data;
};
const fetchOneCategoryById = async (categoryId) => {
    const request = new Request(`${baseUrl}/category/${categoryId}`,{
        method: 'GET',  
    });

    const response = await fetch(request);
    const data = await response.json();

    const category = data && data.length>0 ? data[0] : null;
    return category;
};
const deleteOneCategoryById = async (categoryId) => {
    const request = new Request(`${baseUrl}/category/${categoryId}`,{
        method: 'DELETE',  
    });

    const response = await fetch(request);
    const data = await response.json();

    const category = data && data.returnValue===1 ? true : false;
    return category;
};
*/

const dao = {
  fetchSubjects,
  deleteSingleSubject,
  postNewSubject,
  getProgramNames,
  editSubject,
  getSpaceTypeNames,
  getEquipmentNames,
  postNewSubjectEquipment,
  // fetchCategories,
  // fetchOneCategoryById,
  // deleteOneCategoryById,
};
export default dao;
