import express from "express";
import { TeamController } from "../controllers/teamController";

const router = express.Router();

//router.get("/", TeamController.getAllTeams);
//router.post("/", TeamController.createTeam);

router.get("/members", TeamController.getAllMembers);
router.post("/members/:code", TeamController.addMember);
router.delete("/members/:code", TeamController.removeMember);
router.put("/members/:code/:bool", TeamController.setCoordinator);

// TODO: Add the rest of the routes

export default router;
