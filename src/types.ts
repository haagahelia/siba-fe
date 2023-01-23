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

export interface SpaceType {
  id: number;
  name: string;
}

export interface Equipment {
  id: number;
  name: string;
  equipmentPriority: number;
}

export interface SubjectEquipment {
  subjectId: number;
  equipmentId: number;
  priority: number;
  obligatory: number;
}
