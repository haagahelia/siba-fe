const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;
//import {BASEURL} from "../config/consts.js";
//const baseUrl = BASEURL;

// TODO: Jossakin vaiheessa poistetaan backistä URLeista loput, eli
// ei tarvita esim. /getAll  /delete  /post
// Http Method kertoo sen jo, esim /subject/  GET ilman id:tä => get all subjects
// DELETE, POST jne.

// TODO: Mikähän tänne olis hyvä nimeämiskäytäntö? FETCH

/* ---- SUBJECT ---- */

// Subjectview.js
const fetchAllSubjects = async () => {
  const request = new Request("http://localhost:3001/api/subject/getAll", {
    method: "GET",
  });
  const response = await fetch(request);

  if (response.status === 500) {
    return 500;
  }

  const data = await response.json();
  return data;
};

// ValidateAddSubject / ValidateEditSubject, jossa katsotaan onko opetuksen nimi jo olemassa
const fetchSubjectsNames = async () => {
  const request = new Request("http://localhost:3001/api/subject/getNames", {
    method: "GET",
  });
  const response = await fetch(request);

  if (response.status === 500) {
    return 500;
  }

  const data = await response.json();
  return data;
};

// DeleteSubject.js
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

// AddSubject.js
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

// EditSubject.js
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

/* ---- PROGRAM ---- */

// EditSubject.js / AddSubject.js
const fetchProgramsForSelect = async () => {
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

/* ---- SPACETYPE ---- */

// EditSubject.js / AddSubject.js
const fetchSpacetypeForSelect = async () => {
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

/* ---- EQUIPMENT ---- */
/* 
EditSubjectEquipment.js jossa haetaan varusteen oletus prioriteetti arvoa
AddSubjectEquipment.js jossa haetaan varusteet selectiin */
const fetchEquipmentData = async () => {
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

/* ---- SUBJECTEQUIPMENT ---- */

// AddSubjectEquipment.js
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

// PopDialog.js
const fetchEquipmentBySubjectId = async (id) => {
  const request = new Request(
    `http://localhost:3001/api/subjectequipment/getEquipment/${id}`,
    {
      method: "GET",
    }
  );

  const response = await fetch(request);
  if (response.status === 500) {
    return 500;
  }
  const data = await response.json();
  return data;
};

// DeleteSubjectEquipment.js
const deleteSingleSubjectEquipment = async (subjectId, equipmentId) => {
  try {
    const request = new Request(
      `http://localhost:3001/api/subjectequipment/delete/${subjectId}/${equipmentId}`,
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
// EditSubjectEquipment.js
const editSubjectEquipment = async (editedSubjectEquipment) => {
  try {
    const request = new Request(
      "http://localhost:3001/api/subjectequipment/update",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedSubjectEquipment),
      }
    );
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

const getUnAllocableSubjects = async (id) => {
  try {
    const request = new Request(
      `http://localhost:3001/api/allocation/${id}/subject/unallocated`,
      {
        method: "GET",
      }
    );

    const response = await fetch(request);
    if (response.status === 500) {
      return 500;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return "error";
  }
};

const getSubjectRooms = async (id) => {
  try {
    const request = new Request(
      `http://localhost:3001/api/allocation/subject/${id}/rooms`,
      {
        method: "GET",
      }
    );

    const response = await fetch(request);
    if (response.status === 500) {
      return 500;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return "error";
  }
};

const getMissingEquipmentForRoom = async (subjectId, roomId) => {
  try {
    const request = new Request(
      `http://localhost:3001/api/allocation/missing-eqpt/subject/${subjectId}/room/${roomId}`,
      {
        method: "GET",
      }
    );

    const response = await fetch(request);
    if (response.status === 500) {
      return 500;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return "error";
  }
};

/* ---- EXAMPLE ---- */
/*
const fetchCategories = async () => {
    const request = new Request(`${baseUrl}/category/`,{
        method: 'GET',  
    });

    const response = await fetch(request);
    const data = await response.json();
    return data;
};
*/

const dao = {
  fetchAllSubjects,
  fetchSubjectsNames,
  deleteSingleSubject,
  postNewSubject,
  fetchProgramsForSelect,
  editSubject,
  fetchSpacetypeForSelect,
  fetchEquipmentData,
  postNewSubjectEquipment,
  fetchEquipmentBySubjectId,
  deleteSingleSubjectEquipment,
  editSubjectEquipment,
  getUnAllocableSubjects,
  getSubjectRooms,
  getMissingEquipmentForRoom,
  // fetchCategories,
};
export default dao;
