export * from "./colors";

export interface Response<T> {
  success: boolean;
  data: T[];
}

export interface ResponseFiner<T> {
  httpStatus: number;
  data: T[] | Blob;
}

export interface Subject {
  id: number;
  name: string;
  area: number;
  groupCount: number;
  groupSize: number;
  programId: number;
  programName: string;
  sessionCount: number;
  sessionLength: string;
  spaceTypeId: number;
  spaceTypeName: string;
  isNoisy: boolean;
}

export interface SubjectName {
  id: number;
  name: string;
}

export interface Program {
  id: number;
  name: string;
}

export interface Settings {
  id: number;
  name: string;
  description: string;
  numberValue: number;
  textValue: string;
}

export interface Space {
  id: number;
  name: string;
  area: number;
}

export interface SpaceName {
  id: number;
  name: string;
}

export interface SpaceBuildingName {
  name: string;
}

export interface SpaceType {
  id: number;
  name: string;
}

export interface Equipment {
  id: number;
  name: string;
  priority: number;
  description: string;
}

export interface SubjectEquipment {
  subjectId: number;
  equipmentId: number;
  priority: number;
  obligatory: number;
}

export interface SpaceEquipment {
  spaceId: number;
  equipmentId: number;
}

export interface AllocRound {
  id: number;
  name: string;
  isReadOnly: boolean;
  description: string;
  lastModified: string;
}
export interface CopyAllocRound {
  name: string;
}

export interface Report {
  department: string;
  program: string;
  lesson: string;
  room: string;
}

export interface Building {
  id: number;
  name: string;
  description: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
}

export interface Departmentplanner {
  departmentId: number;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: number;
  isPlanner: number;
  isStatist: number;
}

export interface UserLoggedIn extends User {
  token: string;
}

export interface UnallocableSubject {
  subjectId: number;
  name: string;
  groupSize: number;
  area: number;
  spaceType: string;
  isNoisy: boolean;
}

export interface SubjectRoom {
  id: number;
  name: string;
  area: number;
  missintItems: number;
  areaOk: number;
  personLimit: number;
  isUse: number;
  spaceType: string;
  spaceTypeOk: number;
}

export interface MissingEquipment {
  equipmentId: number;
  name: string;
}
