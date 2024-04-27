// Workplan Controller that handles the requests related to workplans
// uses the WorkplanDAO to perform the operations

import { Request, Response } from "express";
import WorkplanDAO from "../DAOs/workplan";
import Workplan from "../model/Workplan";

/**
 * Class that handles the requests related to workplans
 */
export class WorkplanController {
  /**
   * Get all the workplans
   * @param req the request
   * @param res the response
   */
  public static async getAllWorkplans(
    req: Request,
    res: Response
  ): Promise<void> {
    const workplans = await WorkplanDAO.getAllWorkplans();
    res.json(workplans);
  }

  /**
   * Get a workplan by its id
   * @param req the request
   * @param res the response
   */
  public static async getWorkplanById(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const workplan = await WorkplanDAO.getWorkplanById(id);
    res.json(workplan);
  }

  /**
   * Create a new workplan
   * @param req the request
   * @param res the response
   */
  public static async createWorkplan(
    req: Request,
    res: Response
  ): Promise<void> {
    const workplan = new Workplan(
      "Plan de Trabajo",
      "Descripcion",
      [],
      2024,
      1
    );

    const newWorkplan = await WorkplanDAO.createWorkplan(workplan);
    res.json(newWorkplan);
  }

  /**
   * Update a workplan
   * @param req the request
   * @param res the response
   */
  public static async updateWorkplan(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const workplan: Workplan = req.body;
    const updatedWorkplan = await WorkplanDAO.updateWorkplan(id, workplan);
    res.json(updatedWorkplan);
  }

  /**
   * Delete a workplan
   * @param req the request
   * @param res the response
   */
  public static async deleteWorkplan(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const workplan = await WorkplanDAO.deleteWorkplan(id);
    res.json(workplan);
  }
}
