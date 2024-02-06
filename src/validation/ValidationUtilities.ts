// Add common validation utilities here

import dao from "../ajax/dao";
import { Equipment } from "../types";

// Returns a new string with the first letter of input capitalized.
export function capitalizeFirstLetter(input: string) {
  return input[0].toUpperCase() + input.slice(1);
}

// Check if user enters an existing equipment name.
// Used in equipment add validations.
export const isDuplicatedEquipmentName = async (name: string) => {
  const { data } = await dao.fetchEquipmentData();
  const equipmentList = data as Equipment[];

  return equipmentList.some(
    (equipment) => equipment.name.toLowerCase() === name.toLowerCase(),
  );
};

// Check if user enters an existing equipment name except the current one.
// Used in equipment edit validations.
export const isDuplicatedEquipmentNameExceptCurrent = async (
  currentEquipmentId: number,
  targetName: string,
) => {
  const { data } = await dao.fetchEquipmentData();
  const equipmentList = data as Equipment[];
  const filteredList = equipmentList.filter(
    (item) => item.id !== currentEquipmentId,
  );

  return filteredList.some(
    (equipment) => equipment.name.toLowerCase() === targetName.toLowerCase(),
  );
};
