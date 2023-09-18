import { Color } from "@mui/material";

export interface PaletteContract {
  name: string;
  common: any;
  primary: any;
  secondary: any;
  error: any;
  warning: any;
  info: any;
  success: any;
  grey: any;
  contrastThreshold: number;
  tonalOffset: number;
  text: any;
  divider: string;
  background: any;
  action: any;

  // own colors
  activeLinkBackgroundColor: any;
  AllocRoom: any;
  backgroundDarker: any;
  borderColor: any;
  borderColorDark: any;
  buttonThemeToggle: any;
  edit: any;
  fontColorDefault: any;
  helperText: any;
  infoIcon: any;

  progressBarBackground: any;
  progressBarGreen: any;
  progressBarYellow: any;
  progressBarRed: any;
  progressBarTextNonZero: any;
  progressBarTextZero: any;

  red: any;
  snackbarBackground: any;
}

export interface Response<T> {
  success: boolean;
  data: T[];
}

export interface ResponseFiner<T> {
  httpStatus: number;
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

export interface UserLoggedIn extends User {
  token: string;
}

export interface UnallocableSubject {
  subjectId: number;
  name: string;
  groupSize: number;
  area: number;
  spaceType: string;
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
