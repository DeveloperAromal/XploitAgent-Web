import express from "express";
import {
  createNewVulnerability,
  getVulnerabilityData,
  getVulnerabilityDataByClientId,
} from "../controllers/vulnerabilities.controller.js";

const router = express.Router();

router.get(
  "/generate-vulnerability/:attack_id/:client_id",
  createNewVulnerability
);

router.get("/get-vulnerability/:attack_id", getVulnerabilityData);

router.get(
  "/get-vulnerability-by-client-id/:client_id",
  getVulnerabilityDataByClientId
);

export default router;
