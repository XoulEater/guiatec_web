import Activity from "./Activity";
import WorkplanDTO from "../DTOs/workplan";

export default class Workplan {
  private name: string;
  private description: string;
  private activities: Activity[];
  private year: number;
  private semester: number;

  // Constructor
  constructor(
    nameOrDTO: string | WorkplanDTO,
    description?: string,
    activities?: Activity[],
    year?: number,
    semester?: number
  ) {
    if (typeof nameOrDTO === "string") {
      this.name = nameOrDTO;
      this.description = description;
      this.activities = activities;
      this.year = year;
      this.semester = semester;

    } 
    else {
      this.name = nameOrDTO.name;
      this.description = nameOrDTO.description;
      this.activities = nameOrDTO.activities.map(activityDTO => new Activity(activityDTO));
    }

  }

  // Getter and Setter for name
  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  // Getter and Setter for description
  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  // Getter and Setter for activities
  getActivities(): Activity[] {
    return this.activities;
  }

  setActivities(activities: Activity[]): void {
    this.activities = activities;
  }

  addActivity(activity: Activity): void {
    this.activities.push(activity);
  }
}
