import { Response, SubjectEquipment } from "../types";
import { create, get, remove, update } from "./request";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

// fetching SubjectEquipment by subjectId
export const fetchEquipmentBySubjectId = async (
  id: number,
): Promise<Response<SubjectEquipment>> => {
  const response = await get(`${baseUrl}/subjectequipment/getEquipment/${id}`);
  const subjectEquipments: SubjectEquipment[] = await response.json();
  return { success: response.ok, data: subjectEquipments };
};

// creating new SubjectEquipment
export const postNewSubjectEquipment = async (
  newSubjectEquipment: SubjectEquipment,
): Promise<boolean> => {
  const response = await create(
    `${baseUrl}/subjectequipment/post`,
    newSubjectEquipment,
  );
  const data = await response.json();
  return data;
};

// updating SubjectEquipment
export const editSubjectEquipment = async (
  editedSubjectEquipment: SubjectEquipment,
): Promise<boolean> => {
  const response = await update(
    `${baseUrl}/subjectequipment/update`,
    editedSubjectEquipment,
  );
  const data = await response.json();
  return data.ok;
};

// removing single SubjectEquipment
export const deleteSingleSubjectEquipment = async (
  subjectId: number,
  equipmentId: number,
): Promise<boolean> => {
  const response = await remove(
    `${baseUrl}/subjectequipment/delete/${subjectId}/${equipmentId}`,
  );
  const data = await response.json();
  return data?.affectedRows === 1;
};
