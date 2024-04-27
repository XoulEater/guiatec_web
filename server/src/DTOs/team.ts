// TODO: delete this file
import TeacherDTO from "./teacher";
import WorkPlanDTO from "./workplan";

interface TeamDTO {
  id?: string; // unique identifier of the team
  name: string; // name of the team
  description: string; // description of the team
  workPlans: Array<WorkPlanDTO>; // contains all the workPlans
  members: Array<TeacherDTO>; // contains all the members
}

export default TeamDTO;
