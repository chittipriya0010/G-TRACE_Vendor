import express from "express";
import upload from "../middlewares/upload.js";
import { createBilling, getAllBillings, getBillingById } from "../controllers/billingController.js";

const router = express.Router();

// POST with file upload
router.post("/billings", upload.single("poOfficial"), createBilling);

router.get("/billings", getAllBillings);
router.get("/billings/:id", getBillingById);

export default router;