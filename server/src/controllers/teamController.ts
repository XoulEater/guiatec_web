import { Request, Response } from "express";
import TeacherDAO from "../DAOs/teacher";
import WorkplanDAO from "../DAOs/workplan";

export class TeamController {
  /*
  public static async getAllTeams(req: Request, res: Response): Promise<void> {
    const teams = await TeamDAO.getAllTeams();
    res.json(teams);
  }

  public static async createTeam(req: Request, res: Response): Promise<void> {
    const teamData: TeamDTO = req.body;
    const newTeam = new Team(teamData);
    console.log(newTeam);

    //await TeamDAO.createTeam(newTeam);
    //res.json(newTeam);
    res.json({ message: "Team created" });
  }
  */

  /**
   * Get all the members from the database
   * @param req
   * @param res
   */
  public static async getAllMembers(
    req: Request,
    res: Response
  ): Promise<void> {
    const members = await TeacherDAO.getAllMembers();
    res.json(members);
  }

  /**
   * Add a member to the team
   * @param req
   * @param res
   */
  public static async addMember(req: Request, res: Response): Promise<void> {
    const code = req.params.code;
    await TeacherDAO.addMember(code);
    res.json({ message: "Member added" });
  }

  /**
   * Remove a member from the team
   * @param req
   * @param res
   */
  public static async removeMember(req: Request, res: Response): Promise<void> {
    const code = req.params.code;
    await TeacherDAO.removeMember(code);
    res.json({ message: "Member removed" });
  }

  /**
   * Set a teacher as a coordinator
   * @param req
   * @param res
   */
  public static async setCoordinator(
    req: Request,
    res: Response
  ): Promise<void> {
    const code = req.params.code;
    const isLeader = req.params.bool === "true" ? true : false;
    console.log(code, isLeader);
    await TeacherDAO.setCoordinator(code, isLeader);
    res.json({ message: "Coordinator updated" });
  }
}
