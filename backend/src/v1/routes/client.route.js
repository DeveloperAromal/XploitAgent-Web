import express from "express";
import {
  createNewAttack,
  getAttackData,
  getClientsData,
  insertClient,
  scanReport,
} from "../controllers/client.controller.js";

const router = express.Router();

router.post("/insert/client", insertClient);
router.post("/insert/start-new-attack", createNewAttack);
router.post("/insert/report", scanReport);
router.get("/get/clients-data/:client_id", getClientsData);
router.get("/get/attackData/:attack_id", getAttackData);

export default router;
