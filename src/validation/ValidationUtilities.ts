// Add common validation utilities here

import { DateTime } from "luxon";
import dao from "../ajax/dao";
import { Department, Equipment } from "../types";

// Returns a new string with the first letter of input capitalized.
export function capitalizeFirstLetter(input: string) {
  return input[0].toUpperCase() + input.slice(1);
}

// This can be used to convert times such as 9:00 to 09:00.
export function normalizeTime(timeValue: string) {
  let time = DateTime.fromFormat(timeValue, "H:mm");
  if (!time.isValid) {
    time = DateTime.fromFormat(timeValue, "HH:mm");
  }
  if (!time.isValid) {
    return "";
  }

  return time.toFormat("HH:mm");
}

// This can be used to check for falsy field values in objects.
export const isNotFalsy = (object: Record<string, string>, field: string) => {
  const fieldValue = String(object?.[field] ?? "").toLowerCase();
  return ["yes", "y", "1", "true"].includes(fieldValue);
};

// Checks if equipment name already exists
export const isDuplicatedEquipmentName = async (name: string) => {
  const { data } = await dao.fetchEquipmentData();
  const equipmentList = data as Equipment[];

  return equipmentList.some(
    (equipment) => equipment.name.trim().toLowerCase() === name.toLowerCase(),
  );
};

// Checks if equipment name already exists ignoring currently selected equipment.
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
    (equipment) =>
      equipment.name.trim().toLowerCase() === targetName.toLowerCase(),
  );
};

// Checks if department name already exists. If departmentIdToIgnore is passed, ignores department with that id.
export const isDuplicatedDepartmentName = async (
  name: string,
  departmentIdToIgnore: number | undefined,
) => {
  const { data } = await dao.fetchDepartmentData();
  let departmentList = data as Department[];

  if (departmentIdToIgnore) {
    departmentList = departmentList.filter(
      (department) => department.id !== departmentIdToIgnore,
    );
  }

  return departmentList.some(
    (department) => department.name.trim().toLowerCase() === name.toLowerCase(),
  );
};
