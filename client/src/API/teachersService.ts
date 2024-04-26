// API fetch routes for teachers

import type { TeacherDTO } from "../lib/data";

const API_URL = "http://localhost:1234/api";

/**
 * Get all the teachers
 * @returns a promise with the teachers
 */
export async function getAllTeachers(): Promise<TeacherDTO[]> {
  const response = await fetch(`${API_URL}/teachers`);
  return response.json();
}

/**
 * Get all the teachers from a campus
 * @param campus the campus
 * @returns a promise with the teachers
 */
export async function getTeachersByCampus(
  campus: string
): Promise<TeacherDTO[]> {
  const response = await fetch(`${API_URL}/teachers/campus/${campus}`);
  return response.json();
}

/**
 * Get a teacher by its code
 * @param code the code of the teacher
 * @returns a promise with the teacher
 */
export async function getTeacherByCode(code: string): Promise<TeacherDTO> {
  const response = await fetch(`${API_URL}/teachers/${code}`);
  return response.json();
}

/**
 * Create a new teacher
 * @param teacher the teacher to create
 * @returns a promise with the new teacher
 */
export async function createTeacher(teacher: TeacherDTO) {
  const response = await fetch(`${API_URL}/teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacher),
  });
  return response;
}

/**
 * Update a teacher
 * @param teacher the teacher to update
 * @returns a promise with the updated teacher
 */
export async function updateTeacher(teacher: TeacherDTO): Promise<TeacherDTO> {
  const response = await fetch(`${API_URL}/teachers/${teacher.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacher),
  });
  return response.json();
}

/**
 * Delete a teacher
 * @param code the code of the teacher to delete
 * @returns a promise with the deleted teacher
 */

export async function deleteTeacher(code: string): Promise<TeacherDTO> {
  const response = await fetch(`${API_URL}/teachers/${code}`, {
    method: "DELETE",
  });
  return response.json();
}
