import ActivityDTO from "DTOs/activity";

export default class Activity {
  private name: string; // name of the activity
  private description: string; // description of the activity
  private startDate: Date; // start date of the activity
  private publishDate: Date; // publish date of the activity
  private notificationInterval: number; // notification interval of the activity
  private type: string; // type of the activity
  private responsibles: Array<string>; // responsibles of the activity
  private attachement: string; // attachement of the activity
  private modality: string; // modality of the activity
  private link: string; // link of the activity
  private status: string; // status of the activity
  private forum: string; // forum of the activity


  // Constructor, include the posibility to use TeacherDTO instead of all the parameters
  constructor(
    IDorDTO: string | ActivityDTO,
    name?: string,
    description?: string,
    startDate?: Date,
    publishDate?: Date,
    notificationInterval?: number,
    type?: string,
    responsibles?: Array<string>,
    attachement?: string,
    modality?: string,
    link?: string,
    status?: string,
    forum?: string
  ) {
    if (typeof IDorDTO === "string") {
      this.name = name;
      this.description = description;
      this.startDate = startDate;
      this.publishDate = publishDate;
      this.notificationInterval = notificationInterval;
      this.type = type;
      this.responsibles = responsibles;
      this.attachement = attachement;
      this.modality = modality;
      this.link = link;
      this.status = status;
      this.forum = forum;
      
    } else {
      this.name = IDorDTO.name;
      this.description = IDorDTO.description;
      this.startDate = IDorDTO.startDate;
      this.publishDate = IDorDTO.publishDate;
      this.notificationInterval = IDorDTO.notificationInterval;
      this.type = IDorDTO.type;
      this.responsibles = IDorDTO.responsibles;
      this.attachement = IDorDTO.attachement;
      this.modality = IDorDTO.modality;
      this.link = IDorDTO.link;
      this.status = IDorDTO.status;
      this.forum = IDorDTO.forum;

    }
  }

  // Getter and Setter for officePNumber
  getName(): string {
    return this.name;
  }

  getResponsibles(): Array<string> {
    return this.responsibles;
  }

  getStatus(): string {
    return this.status;
  }
}
