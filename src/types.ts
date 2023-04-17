export interface Response<T> {
  success: boolean;
  data: T[];
}

export interface Subject {
  id: number;
  area: number;
  groupCount: number;
  groupSize: number;
  programId: number;
  programName: string;
  sessionCount: number;
  sessionLength: string;
  spaceTypeId: number;
  spaceTypeName: string;
  subjectName: string;
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

export interface SpaceType {
  id: number;
  name: string;
}

export interface Equipment {
  id: number;
  name: string;
  equipmentPriority: number;
  description: string;
}

export interface SubjectEquipment {
  subjectId: number;
  equipmentId: number;
  priority: number;
  obligatory: number;
}

export interface AllocRound {
  id: number;
  name: string;
  description: string;
  lastModified: string;
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

export interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: number;
  isPlanner: number;
  isStatist: number;
}

export interface UserLoggedIn {
  id: number;
  email: string;
  password: string;
  isAdmin: number;
  isPlanner: number;
  isStatist: number;
  token: string;
}
