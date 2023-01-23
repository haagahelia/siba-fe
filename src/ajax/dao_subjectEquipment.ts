import { Response, SubjectEquipment } from "../types";

export const postNewSubjectEquipment = async (
  newSubjectEquipment: SubjectEquipment,
): Promise<boolean> => {
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
  const data = await response.json();
  return data.ok;
};

// PopDialog.js
export const fetchEquipmentBySubjectId = async (
  id: number,
): Promise<Response<SubjectEquipment>> => {
  const request = new Request(
    `http://localhost:3001/api/subjectequipment/getEquipment/${id}`,
    {
      method: "GET",
    },
  );

  const response = await fetch(request);
  const subjectEquipments: SubjectEquipment[] = await response.json();
  return { success: response.ok, data: subjectEquipments };
};

// DeleteSubjectEquipment.js
export const deleteSingleSubjectEquipment = async (
  subjectId: number,
  equipmentId: number,
): Promise<boolean> => {
  const request = new Request(
    `http://localhost:3001/api/subjectequipment/delete/${subjectId}/${equipmentId}`,
    {
      method: "DELETE",
    },
  );
  const response = await fetch(request);

  const data = await response.json();
  return data?.affectedRows === 1;
};
// EditSubjectEquipment.js
export const editSubjectEquipment = async (
  editedSubjectEquipment: SubjectEquipment,
): Promise<boolean> => {
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
  const data = await response.json();
  return data.ok;
};
