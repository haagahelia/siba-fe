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
const deleteSingleSubject = async (subjectId) => {
  try {
    const request = new Request(
      `http://localhost:3001/api/subject/delete/${subjectId}`,
      {
        method: "DELETE",
      },
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

export {
  fetchAllSubjects,
  fetchSubjectsNames,
  postNewSubject,
  editSubject,
  deleteSingleSubject,
};
