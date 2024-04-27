import express from "express";
import { ActivityController } from "../controllers/activityController";


const router = express.Router();

router.get("/:wid/", ActivityController.getAllActivities);
// router.post("/", ActivityController.createActivity);
// router.put("/members/:code/:bool", ActivityController.cancelActivity);

export default router;

// - get all by plan 	/workplan/:wid/activities
// - get by id 		/workplan/:wid/activity/:aid
// - create in plan 	/workplan/:wid/activity/
// - update 		/workplan/:wid/activity/:aid
