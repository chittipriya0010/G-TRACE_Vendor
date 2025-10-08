import express from "express";
import {
  createServiceRequest,
  getServiceRequests,
} from "../controllers/serviceRequestController.js";

const router = express.Router();

// New routes
router.post("/service-requests", createServiceRequest);
router.get("/service-requests", getServiceRequests);

export default router;