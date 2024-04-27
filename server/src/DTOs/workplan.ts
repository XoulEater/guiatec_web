import ActivityDTO from "../DTOs/activity";

interface WorkplanDTO {
    name: string;
    description: string;
    activities: Array <ActivityDTO>;
  }

export default WorkplanDTO;
