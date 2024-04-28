export enum Campus {
  CA = "CA",
  AL = "AL",
  SJ = "SJ",
  SC = "SC",
  LI = "LI",
}
export enum ActivityType {
  ORIENTADORA = "Orientadora",
  MOTIVACIONAL = "Motivacional",
  APOYO = "Apoyo",
  TECNICA = "Técnica",
  RECREATIVA = "Recreativa",
}

export enum ActivityStatus {
  PLANEADA = "Planeada",
  PUBLICADA = "Publicada",
  NOTIFICADA = "Notificada",
  REALIZADA = "Realizada",
  CANCELADA = "Cancelada",
}

export enum Modalities {
  PRESENCIAL = "Presencial",
  VIRTUAL = "Virtual",
}

export interface User {
  userType?: "teacher" | "assistant"; // type of the user
  name: string; // full name of the user
  email: string; // email of the user
  password: string; // password of the user
  id?: string; // unique identifier of the user
  photo?: string; // URL of the photo of the user
  campus: Campus; // campus where the user is located
  isLeader?: boolean; // if the user is the leader of the team
}

export interface Teacher extends User {
  userType: "teacher";
  id: string; // unique identifier [campus]-[number]
  officePNumber: string; // office phone number of the teacher
  personalPNumber: string; // personal phone number of the teacher
  photo?: string; // URL of the photo of the teacher
  isLeader?: boolean; // if the teacher is the leader of the team
}

export interface Student extends User {
  carnet: number; // unique identifier of the student
  name: string; // full name of the student
  email: string; // email of the student
  personalPNumber: string; // personal phone number of the student
}

export interface Activity {
  id?: string; // unique identifier of the activity
  name: string; // name of the activity
  week: number; // week of the activity in the work plan
  date: Date; // date of the activity
  publicationDate?: Date; // date of publication of the activity
  prevDays?: number; // days before the activity to send the reminder
  reminderInterval: number; // interval of the reminder of the activity
  responsibles: string[]; // list of teachers responsible for the activity
  type: ActivityType; // type of the activity
  modality: Modalities; // modality of the activity
  status: ActivityStatus; // status of the activity
  link?: string; // link of the activity if it is virtual
  attachmentFile?: string; // attachment file of the activity
}

export interface WorkPlan {
  id: string; // unique identifier of the work plan
  name: string; // name of the work plan
  description: string; // description of the work plan
  activities: Activity[]; // list of activities in the work plan
}
