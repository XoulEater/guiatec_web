// API fetch routes for workplans

import { workPlans, type WorkPlanDTO } from "../lib/data";

const API_URL = "http://localhost:1234/api";

/**
 * Get all the workplans
 * @returns a promise with the workplans
 */
export async function getAllWorkplans(): Promise<WorkPlanDTO[]> {
    const response = await fetch(`${API_URL}/workplans`);
    return response.json();
}


/**
 * Get a workplan by its id
 * @param _id the id of the workplan
 * @returns a promise with the workplan
 */
export async function getWorkplanById(_id: string): Promise<WorkPlanDTO> {
    const response = await fetch(`${API_URL}/workplans/${_id}`);
    return response.json();
}

/**
 * Create a new workplan
 * @param workplan the workplan to create
 * @returns a promise with the new workplan
 */
export async function createWorkplan(workplan: WorkPlanDTO): Promise<WorkPlanDTO> {
    const response = await fetch(`${API_URL}/workplans`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(workplan),
    });
    return response.json();
}

/**
 * Update a workplan
 * @param workplan the workplan to update
 * @returns a promise with the updated workplan
 */
export async function updateWorkplan(workplan: WorkPlanDTO): Promise<WorkPlanDTO> {
    const response = await fetch(`${API_URL}/workplans/${workplan.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(workplan),
    });
    return response.json();
}

/**
 * Delete a workplan
 * @param id the id of the workplan to delete
 * @returns a promise with the deleted workplan
 */

export async function deleteWorkplan(id: string): Promise<WorkPlanDTO> {
    const response = await fetch(`${API_URL}/workplans/${id}`, {
        method: "DELETE",
    });
    return response.json();
}
