// Excel Controller that handles the requests related to excel files
// uses the StudentDAO to perform the operations

import { Request, Response } from "express";
import StudentDAO from "../DAOs/student";
import Student from "../model/Student";
import CampusENUM from "../model/campusENUM";
// excel import
import * as xlsx from "xlsx";
import StudentDTO from "DTOs/student";

/**
 * Class that handles the requests related to excel files
 */

export class ExcelController {
  /**
   * Download an excel file with the students from a campus
   * @param req the request
   * @param res the response
   */
  public static async downloadStudents(
    req: Request,
    res: Response
  ): Promise<void> {
    const campus = req.params.campus;
    let students = await StudentDAO.getStudentsByCampus(campus);

    // Create the excel file
    // cols: carnet, fullName, email, phone
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(students);

    xlsx.utils.book_append_sheet(wb, ws, "Students");
    const excelFileName = `students-${campus}.xlsx`;
    xlsx.writeFile(wb, excelFileName);

    res.download(excelFileName);
  }

  /**
   * Download an excel file with a sheet for each campus
   * @param req the request
   * @param res the response
   */
  public static async downloadAllStudents(
    req: Request,
    res: Response
  ): Promise<void> {
    // Create the excel file
    const wb = xlsx.utils.book_new();

    // Create a sheet for each campus
    const campuses = Object.values(CampusENUM);
    await Promise.all(
      campuses.map(async (campus) => {
        // Get the students for the campus
        const campusStudents = await StudentDAO.getStudentsByCampus(campus);
        const ws = xlsx.utils.json_to_sheet(campusStudents);
        xlsx.utils.book_append_sheet(wb, ws, campus);
      })
    );

    const excelFileName = `students-all.xlsx`;
    xlsx.writeFile(wb, excelFileName);
    res.download(excelFileName);
  }

  /**
   * Upload an excel file with students using multer middleware
   * @param req the request
   * @param res the response
   */
  public static async uploadStudents(
    req: Request,
    res: Response
  ): Promise<void> {
    // Get the file
    const campus = req.headers.campus as CampusENUM;
    const file = req.file;
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }

    // Read the excel file
    const wb = xlsx.readFile(file.path);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const studentsData = xlsx.utils.sheet_to_json(ws) as StudentDTO[];

    // Create the students
    const students = studentsData.map(
      (studentData) =>
        new Student(
          studentData.carnet,
          studentData.name,
          studentData.email,
          studentData.personalPNumber,
          campus
        )
    );

    await StudentDAO.createStudents(students);

    res.send("File uploaded");
  }

  /**
   * Generate sample excel file
   * @param req the request
   * @param res the response
   */

  public static async generateSampleFile(
    req: Request,
    res: Response
  ): Promise<void> {
    // Generate the random students
    const students: Student[] = [];
    for (let i = 0; i < 10; i++) {
      const student = new Student(
        Math.floor(Math.random() * 1000000),
        `Student${i}`,
        `email${i}`,
        i * 1000000,
        CampusENUM.SJ
      );
      students.push(student);
    }
    // Create the excel file
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(students);
    // remove column E (campus) from the excel file

    xlsx.utils.book_append_sheet(wb, ws, "Students");
    const excelFileName = `students-sample.xlsx`;
    xlsx.writeFile(wb, excelFileName);

    res.download(excelFileName);
  }
}
