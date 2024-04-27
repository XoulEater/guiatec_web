// User OOP class

import Campus from "./campusENUM";

class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private photo: string;
  private campus: Campus;

  // Constructor
  constructor(
    name: string,
    email: string,
    password: string,
    photo: string,
    campus: Campus,
    id?: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.photo = photo;
    this.campus = campus;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getPhoto(): string {
    return this.photo;
  }

  public getCampus(): Campus {
    return this.campus;
  }

  // Setters
  public setId(id: string): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setPhoto(photo: string): void {
    this.photo = photo;
  }

  public setCampus(campus: Campus): void {
    this.campus = campus;
  }
}

export default User;
