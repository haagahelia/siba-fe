// Add common validation utilities here to avoid code duplication

import dao from "../ajax/dao";
import { Equipment } from "../types";

// Check if user enters an existing equipment name
export const isDuplicatedEquipmentName = async (name: string) => {
  const { data } = await dao.fetchEquipmentData();
  const equipmentList = data as Equipment[];

  return equipmentList.some(
    (equipment) => equipment.name.toLowerCase() === name.toLowerCase(),
  );
};
