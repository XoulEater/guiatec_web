import type { Campus } from "./data";

export interface user {
  userType?: "teacher" | "assistant"; // type of the user
  name: string; // full name of the user
  email: string; // email of the user
  password: string; // password of the user
  id?: string; // unique identifier of the user
  photo?: string; // URL of the photo of the user
  campus: Campus; // campus where the user is located
}

// DTOs for the data that will be used in the application
export interface teacher extends user {
  userType: "teacher";
  id: string; // unique identifier [campus]-[number]
  officePNumber: string; // office phone number of the teacher
  personalPNumber: string; // personal phone number of the teacher
  photo?: string; // URL of the photo of the teacher
  isLeader?: boolean; // if the teacher is the leader of the team
}
