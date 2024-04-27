import { Request, Response } from "express";
import Activity from "../models/Activity";
import ActivityDTO from "../dtos/activity";
import WorkplanDAO from "../daos/workplan";

/**
 * Class that handles the requests related to activities
 */
export class ActivityController {
  /**
   * Get all the activities
   * @param req the request
   * @param res the response
   */
  public static async getAllActivities(
    req: Request,
    res: Response
  ): Promise<void> {
    const workplanId = req.params.wid;

    let workplan;
    try {
      workplan = await WorkplanDAO.getWorkplanById(workplanId);
    } catch (error) {
      res.status(404).json({ message: "Workplan not found" });
      return;
    }

    if (workplan) {
      res.json(workplan.getActivities());
    } else {
      res.status(404).json({ message: "Activities not found" });
    }
  }

  /**
   * Create a new activity
   * @param req the request
   * @param res the response
   */
  public static async createActivity(
    req: Request,
    res: Response
  ): Promise<void> {
    const activityDTO: ActivityDTO = req.body;
    const workplanId = req.params.wid;

    const activity = new Activity(activityDTO);
    let workplan;
    try {
      workplan = await WorkplanDAO.getWorkplanById(workplanId);
    } catch (error) {
      res.status(404).json({ message: "Workplan not found" });
      return;
    }

    if (!workplan) {
      res.status(404).json({ message: "Workplan not found" });
      return;
    }

    workplan.addActivity(activity);
    try {
      await WorkplanDAO.updateWorkplan(workplanId, workplan);
    } catch (error) {
      res.status(500).json({ message: "Error updating workplan" });
      return;
    }

    res.json("Activity created");
  }

  /**
   * Cancel an activity
   * @param req the request
   * @param res the response
   */

  public static async cancelActivity(
    req: Request,
    res: Response
  ): Promise<void> {
    const activityId = req.params.id;
    // TODO: await ActivityDAO.cancelActivity(activityId);
    res.json({ message: "Activity cancelled" });
  }
}
