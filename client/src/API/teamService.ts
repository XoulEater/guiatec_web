// API fetch routes for team operations

import type { TeacherDTO } from "../lib/data";

const API_URL = "http://localhost:1234/api";

/**
 * Get all the members
 * @returns a promise with the members
 */
export async function getAllMembers(): Promise<TeacherDTO[]> {
  const response = await fetch(`${API_URL}/teams/members`);
  return response.json();
}

/**
 * Add a member to the team
 * @param code the code of the teacher
 * @returns a promise with the message
 */
export async function addMember(code: string): Promise<void> {
  await fetch(`${API_URL}/teams/members/${code}`, {
    method: "POST",
  });
}

/**
 * Remove a member from the team
 * @param code the code of the teacher
 * @returns a promise with the message
 */

export async function removeMember(code: string): Promise<void> {
  await fetch(`${API_URL}/teams/members/${code}`, {
    method: "DELETE",
  });
}

/**
 * Set a teacher as a coordinator
 * @param code the code of the teacher
 * @param bool true if the teacher is a coordinator, false otherwise
 * @returns a promise with the message
 */
export async function setCoordinator(
  code: string,
  bool: boolean
): Promise<void> {
  await fetch(`${API_URL}/teams/members/${code}/${bool}`, {
    method: "PUT",
  });
}
