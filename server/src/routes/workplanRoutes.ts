import express from "express";
import { WorkplanController } from "../controllers/workplanController";
import { ActivityController } from "../controllers/activityController";


const router = express.Router();

// Workplan routes
router.get("/", WorkplanController.getAllWorkplans);
router.get("/:code", WorkplanController.getWorkplanById);
router.post("/", WorkplanController.createWorkplan);
router.put("/:code", WorkplanController.updateWorkplan);
router.delete("/:code", WorkplanController.deleteWorkplan);

// Activity routes
router.get("/:wid/activities", ActivityController.getAllActivities);
//router.get("/:wid/activity/:aid", ActivityController.getActivityById);
//router.post("/:wid/activity", ActivityController.createActivity);
//router.put("/:wid/activity/:aid", ActivityController.updateActivity);

export default router;
