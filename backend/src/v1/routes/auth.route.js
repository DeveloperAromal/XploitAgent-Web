import {
  signInAdminUser,
  validateAdminUser,
} from "../controllers/auth.controller.js";
import { Protect } from "../middleware/auth.middleware.js"; // Assuming Protect middleware exists
import express from "express";

const router = express.Router();

router.post("/admin/login", signInAdminUser);
router.get("/admin/validate", Protect, validateAdminUser); // Protected route

export default router;
