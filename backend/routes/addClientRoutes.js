// routes/vehicleRoutes.js
import express from "express";
import { getClients, getNotWorkingVehicles } from "../controllers/addClientController.js";

const router = express.Router();

router.get("/addClients", getClients);
router.get("/vehicles/not-working", getNotWorkingVehicles);

export default router;