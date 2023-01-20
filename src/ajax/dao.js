import { fetchProgramsForSelect } from "./dao_program";
import { fetchEquipmentData } from "./dao_equipment";
import {
  getUnAllocableSubjects,
  getMissingEquipmentForRoom,
  getSubjectRooms,
} from "./dao_allocation";
import { fetchSpacetypeForSelect } from "./dao_spaceType";
import {
  fetchAllSubjects,
  fetchSubjectsNames,
  postNewSubject,
  editSubject,
  deleteSingleSubject,
} from "./dao_subject";
import {
  postNewSubjectEquipment,
  fetchEquipmentBySubjectId,
  editSubjectEquipment,
  deleteSingleSubjectEquipment,
} from "./dao_subjectEquipment";

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
};

export default dao;
