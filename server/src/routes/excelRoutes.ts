import express from "express";
import { ExcelController } from "../controllers/excelController";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // This will save files in an 'uploads' directory in your project root.

const router = express.Router();

// Excel routes
router.get("/download/:campus", ExcelController.downloadStudents);

router.get("/download/", ExcelController.downloadAllStudents);

router.post("/upload", upload.single("file"), ExcelController.uploadStudents);

router.get("/sample/", ExcelController.generateSampleFile);

export default router;
