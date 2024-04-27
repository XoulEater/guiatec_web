import ActivityDTO from "./activity";

interface WorkplanDTO {
  name: string;
  description: string;
  activities: Array<ActivityDTO>;
}

export default WorkplanDTO;
