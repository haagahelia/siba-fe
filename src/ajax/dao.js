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
  console.log(`baseUrl :${baseUrl}`);
  const request = new Request(`${baseUrl}/subject/getAll`, {
    method: "GET",
  });

  const response = await fetch(request);
  const data = await response.json();
  //console.log("Data: "+data);
  return data;
};
const deleteOneSubjectById = async (subjectId) => {
  const request = new Request(`${baseUrl}/subject/delete/${subjectId}`, {
    method: "DELETE",
  });

  const response = await fetch(request);
  const data = await response.json();

  const result = data && data.returnValue === 1 ? true : false;
  return result;
};
const postNewSubject = async (newSubject) => {
  const request = new Request(`${baseUrl}/subject/post`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSubject),
  });

  const response = await fetch(request);
  const data = await response.json();
  return data.insertId;
};

const getProgramNames = async () => {
  const request = new Request(`${baseUrl}/program/getNames`, {
    method: "GET",
  });

  const response = await fetch(request);
  const data = await response.json();
  return data;
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
  deleteOneSubjectById,
  postNewSubject,

  getProgramNames,

  // fetchCategories,
  // fetchOneCategoryById,
  // deleteOneCategoryById,
};
export default dao;
