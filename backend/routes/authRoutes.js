// routes/auth.routes.js
import express from "express";
import { forgotPassword, login, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

export default router;