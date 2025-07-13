import express from "express";
import { pushNewNotification } from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/push-notification", pushNewNotification);

export default router;
