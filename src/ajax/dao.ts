import * as dao_program from "./dao_program";
import * as dao_equipment from "./dao_equipment";
import * as dao_allocation from "./dao_allocation";
import * as dao_spaceType from "./dao_spaceType";
import * as dao_subject from "./dao_subject";
import * as dao_subjectEquipment from "./dao_subjectEquipment";
import * as dao_allocRound from "./dao_allocRound";

const dao = {
  ...dao_program,
  ...dao_equipment,
  ...dao_allocation,
  ...dao_spaceType,
  ...dao_subject,
  ...dao_subjectEquipment,
  ...dao_allocRound,
};

export default dao;
