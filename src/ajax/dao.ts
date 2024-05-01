import * as dao_allocRound from "./dao_allocRound";
import * as dao_allocation from "./dao_allocation";
import * as dao_building from "./dao_building";
import * as dao_department from "./dao_department";
import * as dao_departmentplanner from "./dao_departmentplanner";
import * as dao_equipment from "./dao_equipment";
import * as dao_program from "./dao_program";
import * as dao_resetDatabase from "./dao_resetDatabase";
import * as dao_settings from "./dao_settings";
import * as dao_space from "./dao_space";
import * as dao_spaceEquipment from "./dao_spaceEquipment";
import * as dao_spaceType from "./dao_spaceType";
import * as dao_subject from "./dao_subject";
import * as dao_subjectEquipment from "./dao_subjectEquipment";
import * as dao_user from "./dao_user";

const dao = {
  ...dao_settings,
  ...dao_program,
  ...dao_equipment,
  ...dao_allocation,
  ...dao_spaceType,
  ...dao_space,
  ...dao_spaceEquipment,
  ...dao_subject,
  ...dao_subjectEquipment,
  ...dao_allocRound,
  ...dao_building,
  ...dao_department,
  ...dao_user,
  ...dao_departmentplanner,
  ...dao_resetDatabase,
};

export default dao;
