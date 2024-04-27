import TeamDTO from "DTOs/team";
import Teacher from "./Teacher";
import WorkPlan from "./Workplan";
// TODO: delete this file
export default class Team {
  // singleton instance
  private static instance: Team;
  private name = "Equipo Guia";
  private description =
    "Este es el equipo guia del Instituto Tecnologico de Costa Rica";
  private workPlans: Array<WorkPlan>;
  private members: Array<Teacher>;

  private constructor() {
    this.workPlans = [];
    this.members = [];
  }

  public static getInstance(): Team {
    if (!Team.instance) {
      Team.instance = new Team();
    }

    return Team.instance;
  }

  public getName(): string {
    return this.name;
  }
  public getDescription(): string {
    return this.description;
  }

  public getWorkPlans(): Array<WorkPlan> {
    return this.workPlans;
  }

  public getMembers(): Array<Teacher> {
    return this.members;
  }

  public setWorkPlans(workPlans: Array<WorkPlan>): void {
    this.workPlans = workPlans;
  }

  public setMembers(members: Array<Teacher>): void {
    this.members = members;
  }
}
