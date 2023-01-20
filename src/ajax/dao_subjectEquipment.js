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
      },
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
    },
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
      },
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

export {
  postNewSubjectEquipment,
  fetchEquipmentBySubjectId,
  editSubjectEquipment,
  deleteSingleSubjectEquipment,
};
