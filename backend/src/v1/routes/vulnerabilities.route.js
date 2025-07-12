import express from "express";
import {
  createNewVulnerability,
  getVulnerabilityData,
} from "../controllers/vulnerabilities.controller.js";

const router = express.Router();

router.get(
  "/generate-vulnerability/:attack_id/:client_id",
  createNewVulnerability
);

router.get("/get-vulnerability/:client_id", getVulnerabilityData);

export default router;
