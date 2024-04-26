// API fetch routes for teachers

import type { StudentDTO } from "../lib/data";

const API_URL = "http://localhost:1234/api";

/**
 * Get all the students
 * @returns a promise with the students
 */
export async function getAllStudents(): Promise<StudentDTO[]> {
  const response = await fetch(`${API_URL}/students`);
  return response.json();
}

/**
 * Get all the students from a campus
 * @param campus the campus
 * @returns a promise with the students
 */
export async function getStudentsByCampus(
  campus: string
): Promise<StudentDTO[]> {
  const response = await fetch(`${API_URL}/students/campus/${campus}`);
  return response.json();
}

/**
 * Delete a student
 * @param carnet the id of the student to delete
 * @returns a promise with the deleted student
 */
export async function deleteStudent(carnet: number): Promise<StudentDTO> {
  const response = await fetch(`${API_URL}/students/${carnet}`, {
    method: "DELETE",
  });
  return response.json();
}

/**
 * Update a student
 * @param student the student to update
 * @returns a promise with the updated student
 */
export async function updateStudent(student: StudentDTO): Promise<StudentDTO> {
  const response = await fetch(`${API_URL}/students/${student.carnet}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return response.json();
}
