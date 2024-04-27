interface ActivityDTO {
  id?: string; // unique identifier of the activity
  name: string; // name of the activity
  description: string; // description of the activity
  startDate: Date; // start date of the activity
  publishDate: Date; // publish date of the activity
  notificationInterval: number; // notification interval of the activity
  type: string; // type of the activity
  responsibles: Array<string>; // responsibles of the activity
  attachement: string; // attachement of the activity
  modality: string; // modality of the activity
  link: string; // link of the activity
  status: string; // status of the activity
  forum: string; // forum of the activity
  
}

export default ActivityDTO;
