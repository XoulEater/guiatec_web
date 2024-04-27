import express from "express";
import { StudentController } from "../controllers/studentController";

const router = express.Router();

//Student Routes
router.get("/", StudentController.getAllStudents);
router.get("/campus/:campus", StudentController.getStudentsByCampus);
router.put("/:code", StudentController.updateStudent);
router.delete("/:code", StudentController.deleteStudent);

export default router;
