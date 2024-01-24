// Add common validation utilities here

import dao from "../ajax/dao";
import { Equipment } from "../types";

// Check if user enters an existing equipment name.
// Used in equipment add validations.
export const isDuplicatedEquipmentName = async (equipmentName: string) => {
  const { data } = await dao.fetchEquipmentData();
  const equipmentList = data as Equipment[];

  return equipmentList.some(
    (equipment) => equipment.name.toLowerCase() === equipmentName.toLowerCase(),
  );
};

// Check if user enters an existing equipment name except the current one.
// Used in equipment edit validations.
export const isDuplicatedEquipmentNameExceptCurrent = async (
  currentEquipmentId: number,
  currentEquipmentName: string,
) => {
  const { data } = await dao.fetchEquipmentData();
  const equipmentList = data as Equipment[];
  let id: number;
  let filteredList: Equipment[] = [];

  for (const equipment of equipmentList) {
    if (currentEquipmentId === equipment.id) {
      id = equipment.id;
      filteredList = equipmentList.filter((item) => item.id !== id);
      break;
    }
  }

  return filteredList.some(
    (equipment) =>
      equipment.name.toLowerCase() === currentEquipmentName.toLowerCase(),
  );
};
