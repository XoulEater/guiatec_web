import CampusENUM from "../models/campusENUM";

export default interface StudentDTO {
  carnet: number;
  name: string;
  email: string;
  personalPNumber: number;
  campus?: CampusENUM;
}
